import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { motion, AnimatePresence } from "framer-motion";

export default function DespedidasLanding() {
  return (
    <div className="bg-s-background text-s-on-background font-body-md min-h-screen overflow-x-hidden selection:bg-s-surface-variant selection:text-s-primary">
      
{/*  TopAppBar  */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 chrome-glass">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-s-primary" data-icon="drafts" style={{ fontVariationSettings: "'FILL' 1" }}>drafts</span>
</div>
<div className="absolute left-1/2 -translate-x-1/2">
<h1 className="font-display-xl text-headline-lg font-extrabold text-s-primary tracking-tighter">TE INVITO</h1>
</div>
<div>
<button className="font-label-caps text-label-caps bg-s-primary text-s-on-primary px-6 py-3 hover:bg-s-secondary transition-colors duration-300">ACCESS</button>
</div>
</header>
<main className="pt-[100px]">
{/*  Hero Section  */}
<section className="min-h-[80vh] flex flex-col justify-center px-margin-desktop py-16 lg:py-32 relative overflow-hidden px-6">
<div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter relative z-10">
<div className="col-span-1 lg:col-span-8 lg:col-start-1 flex flex-col justify-center">
<h2 className="font-display-xl text-4xl md:text-display-xl text-s-primary mb-8 leading-none silver-gradient-text uppercase">Elevate Your<br/>Event Experience</h2>
<p className="font-body-md text-body-md text-s-secondary max-w-2xl mb-12 text-lg">
                        Te Invito redefines event management with a brutalist, high-end approach. We fuse avant-garde aesthetics with seamless functionality to curate experiences that demand attention. Enter the new era of sophisticated ticketing.
                    </p>
<div className="flex flex-col sm:flex-row gap-6">
<button className="btn-chrome font-label-caps text-label-caps px-10 py-5 w-fit uppercase">Start Creating</button>
<button className="chrome-border font-label-caps text-label-caps px-10 py-5 w-fit text-s-primary uppercase hover:bg-s-surface-variant transition-colors">Explore Events</button>
</div>
</div>
</div>
{/*  Abstract background element  */}
<div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-s-surface-variant/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
</section>
{/*  Steps Section (01-03)  */}
<section className="py-32 px-margin-desktop border-t border-s-outline-variant">
<div className="max-w-container-max mx-auto">
<div className="mb-24 flex items-baseline gap-4">
<span className="font-label-caps text-s-secondary">METHODOLOGY</span>
<div className="h-[1px] bg-s-outline-variant flex-grow"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-gutter">
{/*  Step 01  */}
<div className="relative group cursor-pointer">
<div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">01</div>
<h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6">Curate</h3>
<p className="font-body-md text-s-secondary">
                            Design your event's digital presence with high-fidelity, uncompromising layouts. Our platform supports your vision, transforming simple logistics into a compelling visual narrative that captivates your audience immediately.
                        </p>
<div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
</div>
{/*  Step 02  */}
<div className="relative group cursor-pointer mt-12 md:mt-24">
<div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">02</div>
<h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6">Distribute</h3>
<p className="font-body-md text-s-secondary">
                            Deploy invitations through an exclusive, secure infrastructure. Precision targeting and high-end delivery mechanisms ensure your event reaches the intended demographic with pristine presentation.
                        </p>
<div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
</div>
{/*  Step 03  */}
<div className="relative group cursor-pointer mt-24 md:mt-48">
<div className="text-display-xl font-display-xl text-s-surface-variant group-hover:text-s-secondary transition-colors duration-500 absolute -top-16 -left-8 -z-10 opacity-50">03</div>
<h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-6">Analyze</h3>
<p className="font-body-md text-s-secondary">
                            Access deep, monochromatic data visualization. Understand attendee behavior and engagement metrics through stark, brutalist dashboards that prioritize clarity and critical insights over superfluous noise.
                        </p>
<div className="mt-8 w-12 h-[1px] bg-s-primary group-hover:w-full transition-all duration-500"></div>
</div>
</div>
</div>
</section>
{/*  Feature Cards (Bento Grid)  */}
<section className="py-32 px-margin-desktop bg-s-surface-container-lowest">
<div className="max-w-container-max mx-auto">
<h2 className="font-display-xl text-headline-lg md:text-display-xl text-s-primary mb-24 silver-gradient-text uppercase text-center">Core<br/>Capabilities</h2>
<div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
{/*  Large Feature  */}
<div className="md:col-span-2 md:row-span-2 chrome-border bg-s-surface p-12 flex flex-col justify-between group relative overflow-hidden"><div className="absolute inset-0 z-0">
<img alt="Background" className="w-full h-full object-cover blur-sm opacity-50" src="https://lh3.googleusercontent.com/aida/AP1WRLt1yecdG-I1zZpzTrLBDUl_GFdpSdhNyQOlp_CvUplOlw691xM_Y5cp8t1oZi5fB31VMPsusvgAcAuBxQOZdOxQxFQjRCI9eaIk5UxlFbPUT5KK31tFchSF0FLvrGu3BQJnsaIzxNvXSODQuwwaflyPKLaO051o8wCcs8cBZTNLxcfz_OgzXPzapJd-IpsSBxHKdmC5uqxGFtCzGZMnnVH55zD-hsjME2Pq1ItnyBo10BQir49xIK1iGFfO"/>
<div className="absolute inset-0 bg-black/40"></div>
</div>
<div className="absolute inset-0 bg-gradient-to-br from-surface-variant/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
<div className="relative z-10">
<span className="material-symbols-outlined text-4xl text-s-primary mb-6 block" data-icon="qr_code_scanner" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_scanner</span>
<h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-s-primary mb-4 leading-tight uppercase">Frictionless<br/>Entry Protocol</h3>
</div>
<div className="relative z-10 mt-12 md:mt-0">
<p className="font-body-md text-s-secondary mb-8 max-w-sm">
                                High-speed, secure QR scanning designed for demanding door operations. Eliminate queues with our industrial-grade check-in architecture.
                            </p>
<span className="font-label-caps text-s-primary uppercase inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                                Discover Engine <span className="material-symbols-outlined" data-icon="arrow_right_alt">arrow_right_alt</span>
</span>
</div>
</div>
{/*  Medium Feature 1  */}
<div className="md:col-span-2 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group relative overflow-hidden"><div className="absolute inset-0 z-0">
<img alt="Background" className="w-full h-full object-cover blur-sm opacity-50" src="https://lh3.googleusercontent.com/aida/AP1WRLseMYrtEtLvakCVTPvMP40AhXc-c2o4oG-CVLX7hsg0ULniIPq92TjIAaVy_wHgYisqP4Xay6KqR7p6iFmHmz0Fin65hQ90EwvHbsmXK9zvpfV4YCzlXRNXUxH4rmcX0AJZBaI1YL7aLiopsnAhnjjhz2xh4yJhcrOnBLPh0lmlmvqkaD4QEUDstIpOOZCmmxah9ooLLioZmmCC23fasNOtLQvcaoq8_aLWK14rYqXjNrJ_Ufyx4rF06Kk"/>
<div className="absolute inset-0 bg-black/40"></div>
</div>
<div className="flex justify-between items-start relative z-10">
<h3 className="font-headline-lg text-2xl md:text-3xl text-s-primary max-w-[200px] uppercase">Dynamic<br/>Ticketing</h3>
<span className="material-symbols-outlined text-3xl text-s-primary" data-icon="confirmation_number" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
</div>
<p className="font-body-md text-s-secondary mt-12 relative z-10">
                            Implement tiered pricing and exclusive access levels with immediate structural enforcement.
                        </p>
</div>
{/*  Small Feature 1  */}
<div className="md:col-span-1 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group hover:bg-s-surface-variant transition-colors relative overflow-hidden"><div className="absolute inset-0 z-0">
<img alt="Background" className="w-full h-full object-cover blur-sm opacity-50" src="https://lh3.googleusercontent.com/aida/AP1WRLv5fB6gaJw1ZrsFWoYcVbprCuwz-vbg-0bG6jRs7tRSmAFgYq-sfdlRn8e4uVNYz3lxC4dFPDShbwb4LoWXSqnfMrHJctFSPAnMD5QkmDvWhIRC1zaJBchpMWV9OGKkrp7F4IuYSV2BPl_VO9VhFjvRSenshw6VpxKQtTk2aiqhUsWFNwFt_gEQjF-8iCPNXyxKnuSMumymyBD4t8YQRh-QBwbNqcvvJERkNpGGYca6tfcTeYPhlQ4EVrlP"/>
<div className="absolute inset-0 bg-black/40"></div>
</div>
<span className="material-symbols-outlined text-3xl text-s-primary mb-4 relative z-10" data-icon="insights" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
<div className="relative z-10">
<h3 className="font-headline-lg text-xl text-s-primary mb-2 uppercase">Real-Time Telemetry</h3>
<p className="font-body-md text-s-secondary text-sm">Live attendance metrics flowing directly to your command center.</p>
</div>
</div>
{/*  Small Feature 2  */}
<div className="md:col-span-1 md:row-span-1 chrome-border bg-s-surface p-8 flex flex-col justify-between group hover:bg-s-surface-variant transition-colors relative overflow-hidden"><div className="absolute inset-0 z-0">
<img alt="Background" className="w-full h-full object-cover blur-sm opacity-50" src="https://lh3.googleusercontent.com/aida/AP1WRLuo9OGZpso-Ghpe0x3LAyeaHXTQk_vmsJ5qjfDs7BGOMnAmRHe4gvd3_F5h5eoa71cPtXdgFvH2epYyqpfZ75fWzPYIU00I-Y2o8koLMiqQ2R01LnStL5AYKjPLk7RZjL6TGvnUnf-ht-a-4vbpNwMj5K5hDv24k4zXcC4S13h1acTwKwtlgeJY23vvfXAa1sKEUrJe3N32EjksIMW2KOarGLxj1R4KqholMfRIbGIiMhHrCiSNRdiANuju"/>
<div className="absolute inset-0 bg-black/40"></div>
</div>
<span className="material-symbols-outlined text-3xl text-s-primary mb-4 relative z-10" data-icon="campaign" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
<div className="relative z-10">
<h3 className="font-headline-lg text-xl text-s-primary mb-2 uppercase">Direct Broadcasting</h3>
<p className="font-body-md text-s-secondary text-sm">Push immediate, high-priority updates to your entire guest list.</p>
</div>
</div>
</div>
</div>
</section>
{/*  CTA Section  */}
<section className="py-32 px-margin-desktop border-t border-s-outline-variant relative overflow-hidden">
<div className="max-w-container-max mx-auto text-center relative z-10">
<h2 className="font-display-xl text-headline-lg md:text-display-xl text-s-primary mb-12 uppercase">Initiate<br/>Rebellion</h2>
<button className="btn-chrome font-label-caps text-label-caps px-16 py-6 uppercase text-lg inline-flex items-center gap-4 group">
                    Join Te Invito
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="w-full py-16 px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-base bg-s-surface-container-lowest border-t border-s-outline-variant flat no shadows">
<div className="font-display-xl text-headline-lg font-bold text-s-primary">TE INVITO</div>
<ul className="flex flex-wrap gap-8 font-label-caps text-label-caps text-s-secondary">
<li className=""><a className="hover:text-s-primary transition-colors text-s-on-surface-variant" href="#">PRIVACY</a></li>
<li className=""><a className="hover:text-s-primary transition-colors text-s-on-surface-variant" href="#">TERMS</a></li>
<li className=""><a className="hover:text-s-primary transition-colors text-s-on-surface-variant" href="#">CONTACT</a></li>
<li className=""><a className="hover:text-s-primary transition-colors text-s-on-surface-variant" href="#">INSTAGRAM</a></li>
</ul>
<div className="font-label-caps text-label-caps text-s-secondary opacity-80 hover:opacity-100">
            © 2024 TE INVITO. ALL REBELLION RESERVED.
        </div>
</footer>

    </div>
  );
}
