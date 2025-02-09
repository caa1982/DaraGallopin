'use client'
import { useForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'

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
    href: 'https://instagram.com/dara_gallopin'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn size={20} />,
    href: 'https://linkedin.com/in/dara-gallopin'
  }
]

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
    await sendToFormspree({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    })
    if (formspreeState.succeeded) {
      reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 text-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
          <p className="text-text/80">
            Have any questions or just want to say hello? I’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="animate__animated animate__fadeInLeft">
            {/* 
              Using a tinted background from your brand colors; 
              .dark or .light can be used interchangeably if you want 
              a lighter or darker tone.
            */}
            <div className="rounded-lg bg-white/10 border border-white/20 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 bg-primary.dark/20">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-text/80">Bali, Indonesia</p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:contact@daragallopin.com"
                    className="text-primary_accent-light hover:text-primary_accent transition-colors break-all"
                  >
                    contact@daragallopin.com
                  </a>
                </div>

                {/* Socials */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                  <div className="flex items-center space-x-6">
                    {socialLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-primary_accent-light transition-colors"
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
            <div className="rounded-lg bg-white/10 border border-white/20 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 bg-primary.dark/20">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your Name"
                    className={`
                      w-full px-4 py-2 rounded-lg 
                      border border-text/20 
                      bg-primary_accent-dark/10
                      text-text
                      placeholder:text-text/60
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary_accent
                      focus:border-transparent
                      transition-colors duration-200
                      ${errors.name ? 'border-secondary_accent.dark' : ''}
                    `}
                  />
                  {errors.name && (
                    <p
                      className="mt-1 text-sm text-secondary_accent.dark"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="you@example.com"
                    className={`
                      w-full px-4 py-2 rounded-lg
                      border border-text/20
                      bg-primary_accent-dark/10
                      text-text
                      placeholder:text-text/60
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary_accent
                      focus:border-transparent
                      transition-colors duration-200
                      ${errors.email ? 'border-secondary_accent.dark' : ''}
                    `}
                  />
                  {errors.email && (
                    <p
                      className="mt-1 text-sm text-secondary_accent.dark"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    placeholder="Inquiry about..."
                    className={`
                      w-full px-4 py-2 rounded-lg
                      border border-text/20
                      bg-primary_accent-dark/10
                      text-text
                      placeholder:text-text/60
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary_accent
                      focus:border-transparent
                      transition-colors duration-200
                      ${errors.subject ? 'border-secondary_accent.dark' : ''}
                    `}
                  />
                  {errors.subject && (
                    <p
                      className="mt-1 text-sm text-secondary_accent.dark"
                      role="alert"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Write your message here..."
                    className={`
                      w-full px-4 py-2 rounded-lg
                      border border-text/20
                      bg-primary_accent-dark/10
                      text-text
                      placeholder:text-text/60
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary_accent
                      focus:border-transparent
                      transition-colors duration-200
                      ${errors.message ? 'border-secondary_accent.dark' : ''}
                    `}
                  />
                  {errors.message && (
                    <p
                      className="mt-1 text-sm text-secondary_accent.dark"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || formspreeState.submitting}
                  className={`
                    w-full bg-secondary_accent text-text py-3 px-6 rounded-lg 
                    font-medium shadow-sm hover:shadow-md 
                    transition-colors duration-200 
                    disabled:opacity-60
                    focus:ring-2 focus:ring-offset-2 focus:ring-secondary_accent
                    inline-flex items-center justify-center
                  `}
                >
                  {isSubmitting || formspreeState.submitting ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner />
                      <span className="ml-2">Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Success Message */}
                {showSuccess && (
                  <div
                    className="animate__animated animate__fadeIn text-primary_accent.dark text-center p-4 bg-primary_accent-light/10 border border-primary_accent.dark/30 rounded-lg mt-4"
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
