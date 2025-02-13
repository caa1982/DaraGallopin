'use client'

import { useForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram size={20} />,
    href: 'https://www.instagram.com/daragallopin/',
    description: 'Follow me on Instagram for daily updates, behind-the-scenes content, and work in progress.'
  },
  {
    name: 'X',
    icon: <FaXTwitter size={20} />,
    href: 'https://x.com/Daragallopin',
    description: 'Join the conversation on X (Twitter) for art insights and exhibition announcements.'
  }
]

interface InputFieldProps {
  label: string
  id: string
  type?: string
  isTextArea?: boolean
  registration: {
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    name: string
    ref: React.RefCallback<HTMLInputElement | HTMLTextAreaElement>
  }
  placeholder: string
  error?: string
  rows?: number
}

function InputField({
  label,
  id,
  type = 'text',
  isTextArea,
  registration,
  placeholder,
  error,
  rows = 5
}: InputFieldProps) {
  const baseClasses =
    'w-full px-4 py-2 rounded-lg border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition duration-200'
  const errorClass = error ? 'border-destructive' : 'border-input'

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-foreground">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          rows={rows}
          {...registration}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClass}`}
          aria-invalid={error ? 'true' : 'false'}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...registration}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClass}`}
          aria-invalid={error ? 'true' : 'false'}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ContactForm>()

  const [formspreeState, sendToFormspree] = useFormspree('your-formspree-id')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isNavigating) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, isNavigating])

  const onSubmit = async (data: ContactForm) => {
    setIsNavigating(true)
    const submissionData = {
      ...data,
      [data.email]: data.email
    }
    await sendToFormspree(submissionData)
    if (formspreeState.succeeded) {
      reset()
      setShowSuccess(true)
    }
  }

  const handleClose = () => {
    setShowSuccess(false)
  }

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
          <div className="animate__animated animate__fadeInLeft">
            <div className="bg-card border-border p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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
                          Feel free to reach out directly for inquiries about commissions, exhibitions, or collaborations.
                          I typically respond within 24-48 hours.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                  <div className="flex items-center space-x-6">
                    {socialLinks.map(link => (
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
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <div className="bg-card border-border p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                  label="Name"
                  id="name"
                  registration={register('name', { required: 'Name is required' })}
                  placeholder="Your Name"
                  error={errors.name?.message}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  registration={register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please provide a valid email address'
                    }
                  })}
                  placeholder="you@example.com"
                  error={errors.email?.message}
                />
                <InputField
                  label="Subject"
                  id="subject"
                  registration={register('subject', { required: 'Subject is required' })}
                  placeholder="Let me know what you're curious about..."
                  error={errors.subject?.message}
                />
                <InputField
                  label="Message"
                  id="message"
                  isTextArea
                  registration={register('message', { required: 'Message is required' })}
                  placeholder="Write your message here..."
                  error={errors.message?.message}
                  rows={5}
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
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showSuccess} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for reaching out. I'll get back to you as soon as possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              onClick={() => {
                setIsNavigating(true)
              }}
              className="btn-primary"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
