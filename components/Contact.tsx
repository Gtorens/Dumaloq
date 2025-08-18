import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Contact: React.FC = () => {
    const { texts } = useAppContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(texts.contact.form.submitAlert);
        (e.target as HTMLFormElement).reset();
    }
  return (
    <section className="py-20 section-variant-4 text-light-text dark:text-dark-text border-t-4 border-accent-red transition-colors duration-300 section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{texts.contact.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {texts.contact.subtitle}
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <form onSubmit={handleSubmit} className="space-y-4 section-card p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">{texts.contact.form.title}</h3>
                <input type="text" placeholder={texts.contact.form.name} required className="modern-input w-full p-4 text-lg"/>
                <input type="text" placeholder={texts.contact.form.brand} required className="modern-input w-full p-4 text-lg"/>
                <input type="tel" placeholder={texts.contact.form.phone} required className="modern-input w-full p-4 text-lg"/>
                <input type="email" placeholder={texts.contact.form.email} required className="modern-input w-full p-4 text-lg"/>
                <button type="submit" className="submit-button w-full py-4 px-8 text-lg">
                    {texts.contact.form.submit}
                </button>
            </form>
            <div className="space-y-8">
                <div className="section-card p-8">
                    <h3 className="text-2xl font-bold mb-4">{texts.contact.info.title}</h3>
                    <p className="text-lg"><strong>{texts.contact.info.managerLabel}</strong> {texts.contact.info.managerName}</p>
                    <p className="text-lg"><strong>{texts.contact.info.phoneLabel}</strong> <a href={`tel:${texts.contact.info.phone}`} className="hover:text-accent-red">{texts.contact.info.phone}</a></p>
                    <p className="text-lg"><strong>{texts.contact.info.emailLabel}</strong> <a href={`mailto:${texts.contact.info.email}`} className="hover:text-accent-red">{texts.contact.info.email}</a></p>
                </div>
                 <div className="qr-code-card flex items-center">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${texts.contact.qr.data}&bgcolor=F9FAFB&color=1F2937&qzone=1`}
                        alt={texts.contact.qr.alt}
                        className="w-32 h-32 rounded-md hidden dark:block"
                    />
                     <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${texts.contact.qr.data}&bgcolor=1F2937&color=F3F4F6&qzone=1`}
                        alt={texts.contact.qr.alt}
                        className="w-32 h-32 rounded-md block dark:hidden"
                    />
                    <div className="ml-6">
                        <h3 className="text-xl font-bold">{texts.contact.qr.title}</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">{texts.contact.qr.subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;