'use client'

import { useForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { FaInstagram, FaXTwitter } from 'react-icons/fa6'

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
    href: 'https://www.instagram.com/daragallopin/'
  },
  {
    name: 'X',
    icon: <FaXTwitter size={20} />,
    href: 'https://linkedin.com/in/dara-gallopin'
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
    'w-full px-4 py-2 rounded-lg border border-text/20 bg-primary-dark/10 text-text placeholder:text-text/60 focus:outline-none focus:ring-2 focus:ring-primary_accent focus:border-transparent transition duration-200'
  // If there's an error, add a red (or secondary accent) border
  const errorClass = error ? 'border-secondary_accent-dark' : ''

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
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
        <p className="mt-1 text-sm text-secondary_accent-dark" role="alert">
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
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>()

  const [formspreeState, sendToFormspree] = useFormspree('your-formspree-id')
  const [showSuccess, setShowSuccess] = useState(false)

  const onSubmit = async (data: ContactForm) => {
    const submissionData = {
      ...data,
      [data.email]: data.email // Compatibility with FieldValues
    }
    await sendToFormspree(submissionData)
    if (formspreeState.succeeded) {
      reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div className="min-h-screen text-text pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg text-text/80">
            Have questions or just want to say hello? I’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="animate__animated animate__fadeInLeft">
            <div className="bg-primary-dark/20 border border-white/20 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-text/80">Bali, Indonesia</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:contact@daragallopin.com"
                    className="text-secondary_accent-light hover:text-primary_accent transition-colors"
                  >
                    contact@daragallopin.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                  <div className="flex items-center space-x-6">
                    {socialLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary_accent-light transition-colors"
                        aria-label={`Follow on ${link.name}`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate__animated animate__fadeInRight">
            <div className="bg-primary-dark/20 border border-white/20 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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

                <button
                  type="submit"
                  disabled={isSubmitting || formspreeState.submitting}
                  className="w-full bg-primary_accent text-text py-3 px-6 rounded-lg font-medium shadow-sm hover:shadow-md transition-colors duration-200 disabled:opacity-60 focus:ring-2 focus:ring-offset-2 focus:ring-secondary_accent inline-flex items-center justify-center"
                >
                  {isSubmitting || formspreeState.submitting ? (
                    <div className="flex items-center">
                      <LoadingSpinner />
                      <span className="ml-2">Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {showSuccess && (
                  <div
                    className="animate__animated animate__fadeIn mt-4 p-4 border border-primary_accent-dark/30 bg-primary_accent-light/10 rounded-lg text-center text-primary_accent-dark"
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
    </div>
  )
}
