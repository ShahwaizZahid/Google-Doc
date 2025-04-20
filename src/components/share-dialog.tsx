"use client";

import { useState } from "react";
import { CalendarIcon, Check, Copy, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [shareLink, setShareLink] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("read");
  const [date, setDate] = useState<Date>();
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [isOrgDocument, setIsOrgDocument] = useState(false);
  const { toast } = useToast();

  const generateShareLink = () => {
    if (isOrgDocument) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "This document belongs to an organization and cannot be shared.",
      });
      return;
    }

    // Generate a mock share link with the selected parameters
    const mockDocId = "doc123456";
    const mockToken = "t" + Math.random().toString(36).substring(2, 15);
    const newLink = `https://yourdomain.com/documents/${mockDocId}?token=${mockToken}&permission=${permission}${
      date ? `&expires=${date.toISOString()}` : ""
    }`;

    setShareLink(newLink);
    setIsLinkGenerated(true);

    toast({
      title: "Success!",
      description: "Share link generated successfully.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(newLink)}
        >
          Copy
        </Button>
      ),
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Link copied to clipboard",
      action: (
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      ),
    });
  };

  const sendInvite = () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!shareLink) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please generate a share link first.",
      });
      return;
    }

    // Mock sending an invite
    toast({
      title: "Invite sent!",
      description: `Invitation sent to ${email}`,
    });
    setEmail("");
  };

  // i want 

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      //  onClose={handleClose}
    >
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

          {isLinkGenerated && (
            <div className="space-y-2">
              <Label htmlFor="shareLink">Generated Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="shareLink"
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(shareLink)}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Share with Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={sendInvite}
                className="shrink-0"
                disabled={!isLinkGenerated}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </div>
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

          <div className="space-y-2">
            <Label>Set Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select expiration date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              The share link will expire after the selected date
            </p>
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
          <Button onClick={generateShareLink} disabled={isOrgDocument}>
            Generate Share Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
