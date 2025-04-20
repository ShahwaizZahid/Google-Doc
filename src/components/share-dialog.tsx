"use client";

import { useState } from "react";
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

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [shareLink, setShareLink] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("read");
  const [isOrgDocument, setIsOrgDocument] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);

  const isValidEmail = (email: string) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateShareLink = () => {
    if (isOrgDocument) {
      alert("This document belongs to an organization and cannot be shared.");
      return;
    }

    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    // Generate a mock token
    const mockToken = "t" + Math.random().toString(36).substring(2, 15);

    // Get the base URL using window.location.pathname
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const newLink = `${baseUrl}?token=${mockToken}&permission=${permission}`;

    setShareLink(newLink);
    setIsSecondDialogOpen(true); // Open the second dialog
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      {/* Main Dialog */}
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
                onValueChange={setPermission}
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
