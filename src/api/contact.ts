// API для отправки формы заявки на email
export interface ContactFormData {
  name: string;
  brand: string;
  phone: string;
  email: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Конфигурация для отправки email
const EMAIL_CONFIG = {
  // Ваш email для получения заявок
  TO_EMAIL: 'yqeodqpk@aurevoirmail.com', // ВАШ EMAIL для получения заявок
  // Тема письма
  SUBJECT: 'Новая заявка с сайта Dumoloq',
  // EmailJS конфигурация (если используете EmailJS)
  EMAILJS: {
    SERVICE_ID: 'service_p8e038q', // ✅ ВАШ SERVICE ID
    TEMPLATE_ID: 'template_s01xm65', // ✅ ВАШ TEMPLATE ID
    PUBLIC_KEY: 'uCmnhDhpShGrW2mEg' // ✅ ВАШ PUBLIC KEY
  }
};

// Функция отправки через EmailJS
export const sendEmailViaEmailJS = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Импорт EmailJS динамически
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      name: formData.name,
      brand: formData.brand,
      phone: formData.phone,
      email: formData.email,
      current_date: new Date().toLocaleString('ru-RU')
    };

    await emailjs.send(
      EMAIL_CONFIG.EMAILJS.SERVICE_ID,
      EMAIL_CONFIG.EMAILJS.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Заявка успешно отправлена!'
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка отправки через EmailJS:', error);
    return {
      success: false,
      message: 'Ошибка отправки заявки. Попробуйте позже.'
    };
  }
};

// Функция отправки через простой fetch (если есть свой backend)
export const sendEmailViaBackend = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: EMAIL_CONFIG.TO_EMAIL,
        subject: EMAIL_CONFIG.SUBJECT,
        html: `
          <h2>Новая заявка с сайта Dumoloq</h2>
          <p><strong>Имя:</strong> ${formData.name}</p>
          <p><strong>Бренд:</strong> ${formData.brand}</p>
          <p><strong>Телефон:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        `,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Заявка успешно отправлена!'
      };
    } else {
      throw new Error('Ошибка сервера');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка отправки через backend:', error);
    return {
      success: false,
      message: 'Ошибка отправки заявки. Попробуйте позже.'
    };
  }
};

// Основная функция отправки (выберите нужный метод)
export const submitContactForm = async (formData: ContactFormData): Promise<EmailResponse> => {
  // ВЫБЕРИТЕ ОДИН ИЗ ВАРИАНТОВ:
  
  // Вариант 1: EmailJS (простой, без backend)
  return await sendEmailViaEmailJS(formData);
  
  // Вариант 2: Свой backend
  // return await sendEmailViaBackend(formData);
};
