import React, { useCallback, useState } from 'react';
import { z } from 'zod';
import { useAppContext } from '../../contexts/AppContext';
import { Button, Input, Card } from '../ui';
import ErrorBoundary from '../ui/ErrorBoundary';
import LazyImage from '../ui/LazyImage';
import { useToast } from '../ui/Toast';

// Декоративные элементы для секции Contact в стиле киберпанк
const ContactDecorations: React.FC = () => (
  <>
    {/* Левая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute left-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-24 left-10 w-20 h-px bg-gradient-to-r from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-24 left-10 w-px h-20 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Треугольники */}
        <div className="absolute top-56 left-18 w-0 h-0 border-l-[8px] border-l-accent-red/25 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-28 left-8 w-0 h-0 border-r-[10px] border-r-accent-red/20 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Квадраты */}
        <div className="absolute top-40 left-20 w-6 h-6 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/5 left-14 w-2 h-2 bg-accent-red/80 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-22 w-1.5 h-1.5 bg-accent-red/70 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-32 left-24 w-16 h-px bg-accent-red/50 transform rotate-45 origin-left"></div>
        <div className="absolute bottom-20 left-20 w-18 h-px bg-accent-red/40 transform -rotate-45 origin-left"></div>
        
        {/* Сетка */}
        <div className="absolute top-48 left-4 w-8 h-8 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>

    {/* Правая сторона - киберпанк геометрия */}
    <div className="hidden xl:block absolute right-0 top-0 w-64 h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* Геометрические линии */}
        <div className="absolute top-20 right-12 w-20 h-px bg-gradient-to-l from-accent-red/60 via-accent-red/40 to-transparent"></div>
        <div className="absolute top-20 right-12 w-px h-20 bg-gradient-to-b from-accent-red/60 via-accent-red/40 to-transparent"></div>
        
        {/* Ромбы */}
        <div className="absolute top-60 right-8 w-5 h-5 border border-accent-red/30 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-24 right-14 w-4 h-4 bg-accent-red/35 transform rotate-45 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-44 right-16 w-6 h-6 bg-accent-red/40 transform rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Анимированные точки */}
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-accent-red/80 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-1/5 right-20 w-1.5 h-1.5 bg-accent-red/70 rounded-full animate-ping" style={{animationDelay: '2.2s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-28 right-20 w-16 h-px bg-accent-red/50 transform -rotate-45 origin-right"></div>
        <div className="absolute bottom-16 right-24 w-18 h-px bg-accent-red/40 transform rotate-45 origin-right"></div>
        
        {/* Сетка */}
        <div className="absolute top-52 right-4 w-6 h-6 border border-accent-red/25 opacity-60">
          <div className="w-full h-px bg-accent-red/25 mt-1/2"></div>
          <div className="w-px h-full bg-accent-red/25 ml-1/2"></div>
        </div>
      </div>
    </div>
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

type FormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

// Константы вместо магических чисел
const FORM_SUBMISSION_DELAY = 1500;
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
        // Имитируем отправку на сервер
        await new Promise(resolve => setTimeout(resolve, FORM_SUBMISSION_DELAY));
        
        // Показываем успешное уведомление - SENIOR подход!
        showToast({
          type: 'success',
          title: 'Заявка отправлена!',
          message: texts.contact.form.submitAlert,
          duration: TOAST_DURATION
        });
        
        // Очищаем форму
        setFormData({ name: '', brand: '', phone: '', email: '' });
        setErrors({});
      } catch (error) {
        // Показываем ошибку - SENIOR подход!
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{texts.contact.title}</h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {texts.contact.subtitle}
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
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
