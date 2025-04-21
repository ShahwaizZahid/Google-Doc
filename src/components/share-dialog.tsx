"use client";

import { useState, useEffect } from "react";
import { Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
};

export function ShareDialog({
  open,
  onOpenChange,
  documentId,
}: ShareDialogProps) {
  const [shareLink, setShareLink] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"read" | "edit">("read");
  const [isOrgDocument, setIsOrgDocument] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);

  const createShareLink = useMutation(api.documents.createShareLink);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateShareLink = async () => {
    if (isOrgDocument) {
      alert("This document belongs to an organization and cannot be shared.");
      return;
    }

    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }
    if (!documentId) {
      return toast.error("Document ID is required.");
    }

    try {
      const documentIdAsId = documentId as Id<"documents">;

      const result = await createShareLink({
        documentId: documentIdAsId,
        email,
        permission,
      });

      const shareUrl = `${window.location.origin}/documents/${documentId}?sharetoken=${result.token}&permission=${permission}`;
      setShareLink(shareUrl);
      setIsSecondDialogOpen(true);
      toast.success("Share link generated successfully!");
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("Failed to generate share link. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPermission("read");
      setIsOrgDocument(false);
      setShareLink("");
      setIsSecondDialogOpen(false);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share This Document</DialogTitle>
            <DialogDescription>
              Generate a link to share with others and set permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {isOrgDocument && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This document belongs to an organization and cannot be shared.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Share with Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="space-y-2">
              <Label>Set Permissions</Label>
              <RadioGroup
                value={permission}
                onValueChange={(value: string) =>
                  setPermission(value as "read" | "edit")
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="read" id="read" />
                  <Label htmlFor="read" className="font-normal">
                    Read Only
                  </Label>
                  <span className="text-xs text-muted-foreground ml-2">
                    The user can view the document
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="edit" id="edit" />
                  <Label htmlFor="edit" className="font-normal">
                    Edit
                  </Label>
                  <span className="text-xs text-muted-foreground ml-2">
                    The user can modify the document
                  </span>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="orgDocument"
                checked={isOrgDocument}
                onChange={(e) => setIsOrgDocument(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="orgDocument" className="text-sm font-normal">
                This document belongs to an organization
              </Label>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={generateShareLink}
              disabled={!email || isOrgDocument}
            >
              Generate Share Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Dialog to Show the Generated Link */}
      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generated Share Link</DialogTitle>
            <DialogDescription>
              Copy the link below to share it with others.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Input value={shareLink} readOnly className="flex-1" />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(shareLink)}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsSecondDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
