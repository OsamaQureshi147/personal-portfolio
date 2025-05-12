import React from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Motion } from "@/components/motion";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Osama Ehsan Qureshi",
  description: "Get in touch with Osama Ehsan Qureshi for project inquiries, collaboration opportunities, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-gradient">Contact Me</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
          </p>
        </Motion>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        <Motion
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>
            <ContactForm />
          </div>
        </Motion>

        <Motion
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">osamahsan@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+92 303 5866788</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">My Workspace</h2>
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src="https://pixabay.com/get/gbe1866d1f8a16ef977610d6daaaa5db061cab6df7d903f8d6a043846842686103ff75db514f4792feb6d3cb759b3346fb3b988dc059685eae1b3bafdecd9edd8_1280.jpg"
                alt="Modern tech workspace"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </Motion>
      </div>

      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <h2 className="mb-6 text-2xl font-bold">Let's Build Something Amazing Together</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Whether you need a full-stack application, a website redesign, or technical consulting,
          I'm ready to help turn your vision into reality.
        </p>
      </Motion>
    </div>
  );
}
