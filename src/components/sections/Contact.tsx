import React, { useCallback, useState } from 'react';
import { z } from 'zod';
import { useAppContext } from '../../contexts/AppContext';
import { Button, Input, Card, AnimatedSection } from '../ui';
import ErrorBoundary from '../ui/ErrorBoundary';
import LazyImage from '../ui/LazyImage';
import CyberpunkDecorations from '../ui/CyberpunkDecorations';
import { useToast } from '../../hooks';
import { submitContactForm, type ContactFormData } from '../../api/contact';

// Переиспользуемые декорации вместо хардкода
const ContactDecorations: React.FC = () => (
  <>
    <CyberpunkDecorations side="left" />
    <CyberpunkDecorations side="right" />
  </>
);

// Zod схема валидации - SENIOR подход!
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[а-яёa-z\s-]+$/i, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  brand: z.string()
    .min(2, 'Название бренда должно содержать минимум 2 символа')
    .max(100, 'Название бренда не должно превышать 100 символов'),
  
  phone: z.string()
    .regex(/^[+]?[0-9\s\-()]{10,}$/, 'Введите корректный номер телефона')
    .min(10, 'Номер телефона должен содержать минимум 10 цифр'),
  
  email: z.string()
    .email('Введите корректный email адрес')
    .max(100, 'Email не должен превышать 100 символов'),
});

type FormData = z.infer<typeof contactFormSchema> & ContactFormData;
type FormErrors = Partial<Record<keyof FormData, string>>;

// Константы вместо магических чисел
const TOAST_DURATION = 5000;

const ContactContent: React.FC = React.memo(() => {
    const { texts } = useAppContext();
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
      name: '',
      brand: '',
      phone: '',
      email: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Валидация через Zod - SENIOR подход!
    const validateForm = useCallback((data: FormData): FormErrors => {
      try {
        contactFormSchema.parse(data);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formErrors: FormErrors = {};
          error.issues.forEach((issue) => {
            const field = issue.path[0] as keyof FormData;
            formErrors[field] = issue.message;
          });
          return formErrors;
        }
        return {};
      }
    }, []);
    
    const handleInputChange = useCallback((field: keyof FormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Очищаем ошибку при вводе
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }, [errors]);
    
    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Валидируем форму
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Отправляем данные на email
        const result = await submitContactForm(formData);
        
        if (result.success) {
          // Показываем успешное уведомление
          showToast({
            type: 'success',
            title: 'Заявка отправлена!',
            message: result.message,
            duration: TOAST_DURATION
          });
          
          // Очищаем форму
          setFormData({ name: '', brand: '', phone: '', email: '' });
          setErrors({});
        } else {
          // Показываем ошибку от API
          showToast({
            type: 'error',
            title: 'Ошибка отправки',
            message: result.message,
            duration: TOAST_DURATION
          });
        }
      } catch (error) {
        // Показываем общую ошибку
        showToast({
          type: 'error',
          title: 'Ошибка отправки',
          message: 'Произошла ошибка при отправке. Попробуйте еще раз.',
          duration: TOAST_DURATION
        });
      } finally {
        setIsSubmitting(false);
      }
    }, [formData, validateForm, texts.contact.form.submitAlert]);
    
    return (
    <section className="py-24 section-variant-4 text-light-text dark:text-dark-text border-t-4 border-accent-red transition-colors duration-300 section-spacing bg-gray-50 dark:bg-transparent relative overflow-hidden">
      <ContactDecorations />
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fadeInDown" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{texts.contact.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {texts.contact.subtitle}
          </p>
        </AnimatedSection>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection animation="fadeInLeft" delay={0.1}>
            <Card variant="default" padding="lg" className="w-full rounded-2xl shadow-xl dark:shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6 text-center">{texts.contact.form.title}</h3>
                    <div className="space-y-5">
                        <Input 
                            type="text" 
                            placeholder={texts.contact.form.name} 
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={errors.name}
                            required 
                            className="w-full"
                        />
                        <Input 
                            type="text" 
                            placeholder={texts.contact.form.brand} 
                            value={formData.brand}
                            onChange={(e) => handleInputChange('brand', e.target.value)}
                            error={errors.brand}
                            required 
                            className="w-full"
                        />
                        <Input 
                            type="tel" 
                            placeholder={texts.contact.form.phone} 
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            error={errors.phone}
                            required 
                            className="w-full"
                        />
                        <Input 
                            type="email" 
                            placeholder={texts.contact.form.email} 
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            error={errors.email}
                            required 
                            className="w-full"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        variant="gradient" 
                        size="xl" 
                        className="w-full mt-8"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Отправка...' : texts.contact.form.submit}
                    </Button>
                </form>
            </Card>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.2}>
            <div className="space-y-10">
                <Card variant="default" padding="lg" className="rounded-2xl shadow-xl dark:shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6">{texts.contact.info.title}</h3>
                    <div className="space-y-4">
                        <p className="text-lg"><strong>{texts.contact.info.managerLabel}</strong> {texts.contact.info.managerName}</p>
                        <p className="text-lg"><strong>{texts.contact.info.phoneLabel}</strong> <a href={`tel:${texts.contact.info.phone}`} className="hover:text-accent-red transition-colors duration-200">{texts.contact.info.phone}</a></p>
                        <p className="text-lg"><strong>{texts.contact.info.emailLabel}</strong> <a href={`mailto:${texts.contact.info.email}`} className="hover:text-accent-red transition-colors duration-200">{texts.contact.info.email}</a></p>
                    </div>
                </Card>
                 <Card variant="default" padding="lg" className="flex items-center rounded-2xl shadow-xl dark:shadow-2xl">
                    <LazyImage 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${texts.contact.qr.data}&bgcolor=F9FAFB&color=1F2937&qzone=1`}
                        alt={texts.contact.qr.alt}
                        className="w-32 h-32 rounded-md hidden dark:block"
                        fallbackSrc="/images/qr-fallback.png"
                    />
                     <LazyImage 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${texts.contact.qr.data}&bgcolor=1F2937&color=F3F4F6&qzone=1`}
                        alt={texts.contact.qr.alt}
                        className="w-32 h-32 rounded-md block dark:hidden"
                        fallbackSrc="/images/qr-fallback.png"
                    />
                    <div className="ml-8">
                        <h3 className="text-xl font-bold mb-3">{texts.contact.qr.title}</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{texts.contact.qr.subtitle}</p>
                    </div>
                </Card>
            </div>
            </AnimatedSection>
        </div>
      </div>
    </section>
  );
});

ContactContent.displayName = 'ContactContent';

const Contact: React.FC = React.memo(() => {
  return (
    <ErrorBoundary
      fallback={
        <div className="py-24 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Ошибка загрузки формы</h2>
          <p className="text-gray-600 leading-relaxed">Не удалось загрузить форму обратной связи. Попробуйте обновить страницу.</p>
        </div>
      }
    >
      <ContactContent />
    </ErrorBoundary>
  );
});

Contact.displayName = 'Contact';

export default Contact;
