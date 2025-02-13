'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram size={20} />,
    href: 'https://www.instagram.com/daragallopin/',
    description:
      'Follow me on Instagram for daily updates, behind-the-scenes content, and work in progress.',
  },
  {
    name: 'X',
    icon: <FaXTwitter size={20} />,
    href: 'https://x.com/Daragallopin',
    description:
      'Join the conversation on X (Twitter) for art insights and exhibition announcements.',
  },
];

// Dummy function to simulate sending data to Formspree.
// Replace this with your actual submission logic.
async function sendToFormspree(submissionData: ContactForm) {
  console.log('Sending data to Formspree:', submissionData);
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export default function Contact() {
  const form = useForm<ContactForm>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  // Simulated state for form submission (e.g. from Formspree)
  const [formspreeState, setFormspreeState] = useState<{
    submitting: boolean;
    succeeded: boolean;
  }>({ submitting: false, succeeded: false });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isNavigating) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isNavigating]);

  const onSubmit = async (data: ContactForm) => {
    setIsNavigating(true);
    setFormspreeState({ submitting: true, succeeded: false });
    // Create submissionData (include email as a key if needed)
    const submissionData = {
      ...data,
      [data.email]: data.email,
    };

    await sendToFormspree(submissionData);
    setFormspreeState({ submitting: false, succeeded: true });
    reset();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg text-muted-foreground">
            Have questions or just want to say hello? I’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Contact Info */}
          <div className="animate__animated animate__fadeInLeft">
            <div className="bg-card border-border p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md dark:shadow-white/5 dark:hover:shadow-white/10 transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Bali, Indonesia</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a
                        href="mailto:contact@daragallopin.com"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        contact@daragallopin.com
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Direct Email Contact</h4>
                        <p className="text-sm text-muted-foreground">
                          Feel free to reach out directly for inquiries about commissions,
                          exhibitions, or collaborations. I typically respond within 24-48 hours.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                  <div className="flex items-center space-x-6">
                    {socialLinks.map((link) => (
                      <HoverCard key={link.name}>
                        <HoverCardTrigger asChild>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-accent transition-colors"
                            aria-label={`Follow on ${link.name}`}
                          >
                            {link.icon}
                          </a>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Follow on {link.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="animate__animated animate__fadeInRight">
            <div className="bg-card border-border p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md dark:shadow-white/5 dark:hover:shadow-white/10 transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please provide a valid email address',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    rules={{ required: 'Subject is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Let me know what you're curious about..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    rules={{ required: 'Message is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your message here..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting || formspreeState.submitting}
                    className="w-full btn-primary"
                  >
                    {isSubmitting || formspreeState.submitting ? (
                      <div className="flex items-center">
                        <LoadingSpinner />
                        <span className="ml-2">Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>

                  {showSuccess && (
                    <div
                      className="animate__animated animate__fadeIn mt-4 p-4 border border-accent bg-accent/10 rounded-lg text-center"
                      role="alert"
                    >
                      Thank you for your message! I’ll get back to you soon.
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              {"Thank you for reaching out. I'll get back to you as soon as possible."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved Changes Alert Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-ghost">Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setIsNavigating(true)}
              className="btn-primary"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
