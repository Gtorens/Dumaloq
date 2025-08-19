export type Translation = {
    header: {
        title: string;
        navigation: {
            about: string;
            tenants: string;
            floors: string;
            plans: string;
            faq: string;
            contacts: string;
        };
    };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
    };
    location: {
        title: string;
        subtitle: string;
        map: {
            title: string;
            link: string;
        };
        traffic: {
            title: string;
            value: string;
            description: string;
        };
        radius: {
            title: string;
            items: { label: string; value: string }[];
        };
    };
    opportunities: {
        title: string;
        items: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
    floorsOverview: {
        title: string;
        subtitle: string;
        floors: {
            floorNum: string;
            title: string;
            description: string;
            logos: { url: string; name: string }[];
            imageUrl: string;
            reverse?: boolean;
        }[];
    };
    atmosphere: {
        title: string;
        subtitle: string;
        description: string;
    };
    floorPlans: {
        title: string;
        subtitle: string;
        downloadButton: string;
        tabs: {
            [key: string]: {
                title: string;
                conceptTitle: string;
                conceptText: string;
                premisesTitle: string;
                premisesList: { label: string; value: string; highlight?: boolean; }[];
                imageAlt: string;
            }
        }
    };
    techSpecs: {
        title: string;
        specs: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
    rentalConditions: {
        title: string;
        description: string;
        cta: string;
    };
    faq: {
        title: string;
        subtitle: string;
        items: {
            question: string;
            answer: string;
        }[];
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            title: string;
            name: string;
            brand: string;
            phone: string;
            email: string;
            submit: string;
            submitAlert: string;
        };
        info: {
            title: string;
            managerLabel: string;
            managerName: string;
            phoneLabel: string;
            phone: string;
            emailLabel: string;
            email: string;
        };
        qr: {
            title: string;
            subtitle: string;
            alt: string;
            data: string;
        };
    };
    footer: {
        copyright: string;
    };
};

type Translations = {
    [key in 'ru' | 'en' | 'uz']: Translation;
};


export const translations: Translations = {
    ru: {
        header: {
            title: "Dumoloq",
            navigation: {
                about: "О проекте",
                tenants: "Арендаторам",
                floors: "Этажи",
                plans: "Планировки",
                faq: "FAQ",
                contacts: "Контакты"
            }
        },
        hero: {
            title: "Ваш бизнес в центре туристического потока.",
            subtitle: "Единственный ТРЦ на пути к главным горным курортам страны — Амирсой, Чимган и Чарвак. Займите стратегическую позицию там, где проезжают все.",
            cta: "Посмотреть свободные площади"
        },
        location: {
            title: "Эпицентр трафика. Ноль конкурентов.",
            subtitle: "Dumoloq расположен на ключевой транспортной артерии, соединяющей Ташкент с главными зонами отдыха. Мы — обязательная остановка для сотен тысяч людей с высокой покупательской способностью.",
            map: {
                title: "Наше местоположение на карте:",
                link: "Открыть в Google Maps"
            },
            traffic: {
                title: "Трафик:",
                value: "До 50 000",
                description: "автомобилей в пиковые дни. Гарантированный поток клиентов круглый год."
            },
            radius: {
                title: "В радиусе 30 минут:",
                items: [
                    { label: "Ключевые курорты:", value: "Amirsoy, Чимган, Бельдерсай." },
                    { label: "Главная зона отдыха:", value: "Чарвакское водохранилище." },
                    { label: "Населенные пункты:", value: "Газалкент, Юсуфхона, Бурчмулла." }
                ]
            }
        },
        opportunities: {
            title: "Ключевые преимущества для вашего бизнеса",
            items: [
                { icon: 'mapPin', title: 'Стратегическая локация', description: 'Все туристические и дачные потоки проходят через нас, обеспечивая непрерывный приток посетителей.' },
                { icon: 'users', title: 'Гарантированный трафик', description: 'Якорные арендаторы Korzinka и Sinsay создают стабильно высокий поток покупателей с первого дня.' },
                { icon: 'shieldCheck', title: 'Отсутствие конкурентов', description: 'Вы становитесь частью единственного современного ТРЦ на всем пути к главным зонам отдыха.' },
                { icon: 'cog', title: 'Гибкие условия', description: 'Предлагаем свободные планировки и индивидуальный подход для реализации проекта любой сложности.' }
            ]
        },
        floorsOverview: {
            title: "4 Этажа Возможностей для Вашего Бизнеса",
            subtitle: "Каждый этаж Dumoloq имеет свою уникальную концепцию, привлекая целевую аудиторию и создавая синергию между арендаторами.",
            floors: [
                 {
                    floorNum: '1',
                    title: 'Продукты и Еда',
                    description: 'Первый этаж площадью 800 кв.м полностью занят якорными арендаторами — крупнейший в стране супермаркет Korzinka и всемирно известный ресторан KFC. Максимальный трафик и стабильный поток посетителей с первого дня.',
                    logos: [
                        { url: "/logo/korzinka.png", name: "Korzinka" },
                        { url: "/logo/kfc.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Эпицентр Моды и Стиля',
                    description: 'Второй этаж площадью 800 кв.м полностью занимает популярный магазин одежды Sinsay. Полная концентрация на fashion-ритейле и стильных решениях для молодежи и семей.',
                    logos: [
                        { url: "/logo/sinsay.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Fashion + Lifestyle',
                    description: 'Третий этаж площадью 800 кв.м объединяет fashion-ритейл и lifestyle товары. Здесь размещаются магазины одежды, обуви, аксессуаров, а также товары для дома и стильные решения для современной жизни.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Food-court + Entertainment',
                    description: 'Четвертый этаж площадью 400 кв.м — зона гастрономии и развлечений с панорамным видом на горы. Здесь размещается фуд-корт, рестораны, кофейни и развлекательные центры. Уникальная терраса площадью 457 м² станет главной точкой притяжения региона.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-4.jpg',
                    reverse: true
                }
            ]
        },
        atmosphere: {
            title: "Концепция: Gateway to the Mountains",
            subtitle: "Атмосфера, которая вдохновляет",
            description: "Интерьер Dumoloq выполнен в современном стиле, сочетая природные материалы и панорамные окна с видом на горы. Мы создали не просто торговый центр, а место притяжения, где хочется проводить время. Просторные зоны отдыха, инстаграмные фотозоны и уникальная атмосфера заставят посетителей возвращаться снова и снова."
        },
        floorPlans: {
            title: "Ваше идеальное пространство",
            subtitle: "Мы предлагаем свободные площади с готовой концепцией. Выберите этаж, который идеально подходит для вашего бизнеса.",
            downloadButton: "Скачать все поэтажные планы (PDF)",
            tabs: {
                floor1: {
                    title: "1 этаж – Food & Grocery",
                    conceptTitle: "Концепция",
                    conceptText: "Этаж с максимальным трафиком площадью 800 кв.м. Полностью занят якорными арендаторами Korzinka и KFC, обеспечивая стабильный поток посетителей и высокую проходимость.",
                    premisesTitle: "Арендаторы",
                    premisesList: [
                        { label: "Korzinka:", value: "крупнейший супермаркет в стране" },
                        { label: "KFC:", value: "всемирно известная сеть быстрого питания" }
                    ],
                    imageAlt: "План 1 этажа"
                },
                floor2: {
                    title: "2 этаж – Fashion Retail",
                    conceptTitle: "Концепция",
                    conceptText: "Этаж площадью 800 кв.м полностью занимает популярный магазин одежды Sinsay. Центр притяжения для любителей модного шопинга и стильных решений для всей семьи.",
                    premisesTitle: "Арендатор",
                    premisesList: [
                        { label: "Sinsay:", value: "популярный магазин одежды и аксессуаров" },
                        { label: "Площадь:", value: "800 кв.м современного торгового пространства" }
                    ],
                    imageAlt: "План 2 этажа"
                },
                floor3: {
                    title: "3 этаж – Fashion + Lifestyle",
                    conceptTitle: "Концепция",
                    conceptText: "Этаж площадью 800 кв.м объединяет fashion-ритейл и lifestyle товары. Идеальное пространство для магазинов одежды, обуви, аксессуаров, товаров для дома и современных lifestyle брендов.",
                    premisesTitle: "Свободные помещения",
                    premisesList: [
                        { label: "Общая площадь:", value: "800 кв.м свободной планировки" },
                        { label: "Fashion-зона:", value: "для магазинов одежды и аксессуаров" },
                        { label: "Lifestyle-зона:", value: "для товаров для дома и стиля жизни" }
                    ],
                    imageAlt: "План 3 этажа"
                },
                floor4: {
                    title: "4 этаж – Food-court + Entertainment",
                    conceptTitle: "Концепция",
                    conceptText: "Этаж площадью 400 кв.м — зона гастрономии и развлечений с панорамным видом на горы. Идеальное место для фуд-корта, ресторанов, кофеен и развлекательных центров.",
                    premisesTitle: "Свободные помещения",
                    premisesList: [
                        { label: "Общая площадь:", value: "400 кв.м для food-court и entertainment" },
                        { label: "Открытая терраса:", value: "457 м² с видом на горы", highlight: true },
                        { label: "Зоны:", value: "фуд-корт, рестораны, развлечения" }
                    ],
                    imageAlt: "План 4 этажа"
                }
            }
        },
        techSpecs: {
            title: "Все продумано для вашего удобства.",
            specs: [
                { icon: "parking", title: "Парковка", description: "Просторная наземная парковка на 150+ машиномест" },
                { icon: "ceiling", title: "Высота потолков", description: "4.0 метра" },
                { icon: "utilities", title: "Коммуникации", description: "Централизованные системы, высокие электрические мощности" },
                { icon: "transport", title: "Вертикальный транспорт", description: "Пассажирские и грузовые лифты, эскалаторы" },
                { icon: "security", title: "Безопасность", description: "Круглосуточная охрана и видеонаблюдение" },
                { icon: "airconditioning", title: "Кондиционирование", description: "Современная система климат-контроля" }
            ]
        },
        rentalConditions: {
            title: "Гибкие условия аренды",
            description: "Мы предлагаем конкурентные арендные ставки и гибкие условия сотрудничества. Площади от 20 м² до 500 м² со свободной планировкой позволяют реализовать проект любой сложности. Свяжитесь с нами, чтобы обсудить индивидуальные условия для вашего бренда.",
            cta: "Получить консультацию"
        },
        faq: {
            title: "Ответы на частые вопросы",
            subtitle: "Мы ценим ваше время. Здесь собрана ключевая информация для будущих партнеров.",
            items: [
                {
                    question: "Каковы базовые условия аренды?",
                    answer: "Мы предлагаем долгосрочные договоры аренды (от 3 лет) с фиксированной ставкой. Предусмотрен обеспечительный платеж. Коммунальные услуги и эксплуатационные расходы оплачиваются отдельно."
                },
                {
                    question: "Предоставляется ли арендаторам маркетинговая поддержка?",
                    answer: "Да, мы предоставляем комплексную маркетинговую поддержку: размещение в наших digital-каналах, участие в общих рекламных кампаниях, организация совместных мероприятий и акций."
                },
                {
                    question: "В каком состоянии передаются помещения?",
                    answer: "Помещения передаются в состоянии white box с подведенными коммуникациями (электричество, вода, вентиляция, интернет). Отделочные работы выполняются арендатором согласно дизайн-коду ТРЦ."
                },
                {
                    question: "Как происходит отбор арендаторов?",
                    answer: "Мы тщательно отбираем арендаторов, учитывая репутацию бренда, финансовую стабильность и соответствие концепции этажа. Приоритет отдается известным брендам и уникальным концепциям."
                },
                {
                    question: "Какие документы нужны для заключения договора?",
                    answer: "Для юридических лиц: устав, справка о налоговых обязательствах, финансовая отчетность за последний год. Для ИП: справка о доходах, справка об отсутствии задолженностей. Полный список предоставляется при серьезном интересе."
                }
            ]
        },
        contact: {
            title: "Займите лучшее место. Конкурентов не будет.",
            subtitle: "Оставьте заявку, чтобы получить персональное коммерческое предложение и забронировать лучшую локацию в ТРЦ \"Dumoloq\".",
            form: {
                title: "Форма заявки",
                name: "Имя",
                brand: "Бренд",
                phone: "Телефон",
                email: "E-mail",
                submit: "Отправить",
                submitAlert: "Заявка отправлена! Мы скоро с вами свяжемся."
            },
            info: {
                title: "Контактная информация",
                managerLabel: "Менеджер:",
                managerName: "Алексей Петров",
                phoneLabel: "Телефон:",
                phone: "+998 90 123 45 67",
                emailLabel: "E-mail:",
                email: "sales@dumoloq.uz"
            },
            qr: {
                title: "Скачайте полную презентацию",
                subtitle: "Наведите камеру, чтобы получить PDF-файл со всей информацией.",
                alt: "QR Code for presentation",
                data: "https://example.com/dumoloq-presentation-ru.pdf"
            }
        },
        footer: {
            copyright: "Dumoloq. Все права защищены."
        }
    },
    en: {
        header: {
            title: "Dumoloq",
            navigation: {
                about: "About",
                tenants: "For Tenants",
                floors: "Floors",
                plans: "Layouts",
                faq: "FAQ",
                contacts: "Contacts"
            }
        },
        hero: {
            title: "Your Business in the Center of Tourist Flow.",
            subtitle: "The only shopping mall on the way to the country's main mountain resorts — Amirsoy, Chimgan, and Charvak. Secure a strategic position where everyone passes by.",
            cta: "View Available Spaces"
        },
        location: {
            title: "Epicenter of Traffic. Zero Competition.",
            subtitle: "Dumoloq is located on a key transport artery connecting Tashkent with the main recreation areas. We are a mandatory stop for hundreds of thousands of people with high purchasing power.",
            map: {
                title: "Our Location on the Map:",
                link: "Open in Google Maps"
            },
            traffic: {
                title: "Traffic:",
                value: "Up to 50,000",
                description: "vehicles on peak days. A guaranteed flow of customers all year round."
            },
            radius: {
                title: "Within a 30-minute radius:",
                items: [
                    { label: "Key Resorts:", value: "Amirsoy, Chimgan, Beldersay." },
                    { label: "Main Recreation Area:", value: "Charvak Reservoir." },
                    { label: "Settlements:", value: "Gazalkent, Yusufkhona, Burchmulla." }
                ]
            }
        },
        opportunities: {
            title: "Key Advantages for Your Business",
            items: [
                { icon: 'mapPin', title: 'Strategic Location', description: 'All tourist and dacha flows pass through us, ensuring a continuous stream of visitors.' },
                { icon: 'users', title: 'Guaranteed Traffic', description: 'Anchor tenants Korzinka and Sinsay create a consistently high flow of customers from day one.' },
                { icon: 'shieldCheck', title: 'No Competition', description: 'You become part of the only modern shopping mall on the entire route to the main recreation areas.' },
                { icon: 'cog', title: 'Flexible Conditions', description: 'We offer open layouts and an individual approach to implement a project of any complexity.' }
            ]
        },
        floorsOverview: {
            title: "4 Floors of Opportunities for Your Business",
            subtitle: "Each floor of Dumoloq has its own unique concept, attracting a target audience and creating synergy between tenants.",
            floors: [
                {
                    floorNum: '1',
                    title: 'Groceries & Food',
                    description: 'The first floor with an area of 800 m² is fully occupied by the anchor tenants — the country\'s largest supermarket Korzinka and the world‑famous KFC restaurant. Maximum traffic and a stable flow of visitors from day one.',
                    logos: [
                        { url: "/logo/korzinka.png", name: "Korzinka" },
                        { url: "/logo/kfc.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Epicenter of Fashion & Style',
                    description: 'The second floor with an area of 800 m² is fully occupied by the popular clothing store Sinsay. A full focus on fashion retail and stylish solutions for youth and families.',
                    logos: [
                        { url: "/logo/sinsay.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Fashion + Lifestyle',
                    description: 'The third floor with an area of 800 m² combines fashion retail and lifestyle goods. It features clothing, footwear, accessories, as well as home goods and stylish solutions for modern living.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Food-court + Entertainment',
                    description: 'The fourth floor with an area of 400 m² is a gastronomy and entertainment zone with panoramic mountain views. It houses a food court, restaurants, coffee shops, and entertainment centers. A unique 457 m² terrace will become the main attraction of the region.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-4.jpg',
                    reverse: true
                }
            ]
        },
        atmosphere: {
            title: "Concept: Gateway to the Mountains",
            subtitle: "An atmosphere that inspires",
            description: "The interior of Dumoloq is designed in a modern style, combining natural materials and panoramic windows with mountain views. We have created not just a shopping center, but a destination where people want to spend time. Spacious lounge areas, Instagrammable photo zones, and a unique atmosphere will make visitors come back again and again."
        },
        floorPlans: {
            title: "Your Ideal Space",
            subtitle: "We offer available spaces with a ready-made concept. Choose the floor that is perfect for your business.",
            downloadButton: "Download All Floor Plans (PDF)",
            tabs: {
                floor1: {
                    title: "1st Floor – Food & Grocery",
                    conceptTitle: "Concept",
                    conceptText: "An 800 m² floor fully occupied by the anchor tenants Korzinka and KFC, ensuring a stable flow of visitors and high foot traffic.",
                    premisesTitle: "Tenants",
                    premisesList: [
                        { label: "Korzinka:", value: "the country's largest supermarket" },
                        { label: "KFC:", value: "world‑famous fast food chain" }
                    ],
                    imageAlt: "1st Floor Plan"
                },
                floor2: {
                    title: "2nd Floor – Fashion Retail",
                    conceptTitle: "Concept",
                    conceptText: "An 800 m² floor fully occupied by the popular clothing store Sinsay. A center of attraction for fashion shopping for the whole family.",
                    premisesTitle: "Tenant",
                    premisesList: [
                        { label: "Sinsay:", value: "popular clothing and accessories store" },
                        { label: "Area:", value: "800 m² of modern retail space" }
                    ],
                    imageAlt: "2nd Floor Plan"
                },
                floor3: {
                    title: "3rd Floor – Fashion + Lifestyle",
                    conceptTitle: "Concept",
                    conceptText: "An 800 m² floor combining fashion retail and lifestyle goods. Ideal for clothing, footwear, accessories, home goods, and modern lifestyle brands.",
                    premisesTitle: "Available Spaces",
                    premisesList: [
                        { label: "Total area:", value: "800 m² of open plan" },
                        { label: "Fashion zone:", value: "for clothing and accessories stores" },
                        { label: "Lifestyle zone:", value: "for home and lifestyle goods" }
                    ],
                    imageAlt: "3rd Floor Plan"
                },
                floor4: {
                    title: "4th Floor – Food-court + Entertainment",
                    conceptTitle: "Concept",
                    conceptText: "A 400 m² floor — a zone of gastronomy and entertainment with panoramic mountain views. Ideal for a food court, restaurants, coffee shops, and entertainment centers.",
                    premisesTitle: "Available Spaces",
                    premisesList: [
                        { label: "Total area:", value: "400 m² for food‑court and entertainment" },
                        { label: "Open terrace:", value: "457 m² with mountain view", highlight: true },
                        { label: "Zones:", value: "food court, restaurants, entertainment" }
                    ],
                    imageAlt: "4th Floor Plan"
                }
            }
        },
        techSpecs: {
            title: "Everything is designed for your convenience.",
            specs: [
                { icon: "parking", title: "Parking", description: "Spacious ground parking for 150+ cars" },
                { icon: "ceiling", title: "Ceiling Height", description: "4.0 meters" },
                { icon: "utilities", title: "Utilities", description: "Centralized systems, high electrical capacity" },
                { icon: "transport", title: "Vertical Transport", description: "Passenger and freight elevators, escalators" },
                { icon: "security", title: "Security", description: "24/7 security and video surveillance" },
                { icon: "airconditioning", title: "Air Conditioning", description: "Modern climate control system" }
            ]
        },
        rentalConditions: {
            title: "Flexible Rental Conditions",
            description: "We offer competitive rental rates and flexible partnership terms. Spaces from 20 m² to 500 m² with open layouts allow for the implementation of projects of any complexity. Contact us to discuss individual terms for your brand.",
            cta: "Get a Consultation"
        },
        contact: {
            title: "Secure the best spot. There will be no competitors.",
            subtitle: "Leave a request to receive a personalized commercial offer and book the best location in the \"Dumoloq\" shopping mall.",
            form: {
                title: "Request Form",
                name: "Name",
                brand: "Brand",
                phone: "Phone",
                email: "E-mail",
                submit: "Submit",
                submitAlert: "Request sent! We will contact you shortly."
            },
            info: {
                title: "Contact Information",
                managerLabel: "Manager:",
                managerName: "Alexey Petrov",
                phoneLabel: "Phone:",
                phone: "+998 90 123 45 67",
                emailLabel: "E-mail:",
                email: "sales@dumoloq.uz"
            },
            qr: {
                title: "Download the full presentation",
                subtitle: "Point your camera to get the PDF file with all the information.",
                alt: "QR Code for presentation",
                data: "https://example.com/dumoloq-presentation-en.pdf"
            }
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "We value your time. Here is key information for future partners.",
            items: [
                {
                    question: "What are the basic rental terms?",
                    answer: "We offer long-term lease agreements (from 3 years) with a fixed rate. A security deposit is provided. Utilities and operational costs are paid separately."
                },
                {
                    question: "Is marketing support provided to tenants?",
                    answer: "Yes, we provide comprehensive marketing support: placement in our digital channels, participation in joint advertising campaigns, organization of joint events and promotions."
                },
                {
                    question: "In what condition are the premises handed over?",
                    answer: "Premises are handed over in white box condition with connected utilities (electricity, water, ventilation, internet). Finishing work is performed by the tenant according to the mall's design code."
                },
                {
                    question: "How is tenant selection carried out?",
                    answer: "We carefully select tenants, considering brand reputation, financial stability, and compliance with the floor concept. Priority is given to well-known brands and unique concepts."
                },
                {
                    question: "What documents are needed to conclude a contract?",
                    answer: "For legal entities: charter, tax obligations certificate, financial statements for the last year. For individual entrepreneurs: income certificate, debt-free certificate. The full list is provided upon serious interest."
                }
            ]
        },
        footer: {
            copyright: "Dumoloq. All rights reserved."
        }
    },
    uz: {
        header: {
            title: "Dumoloq",
            navigation: {
                about: "Loyiha haqida",
                tenants: "Ijarachilar uchun",
                floors: "Qavatlar",
                plans: "Planlar",
                faq: "FAQ",
                contacts: "Aloqa"
            }
        },
        hero: {
            title: "Sizning biznesingiz turistik oqim markazida.",
            subtitle: "Mamlakatning asosiy togʻ-changʻi kurortlari — Amirsoy, Chimyon va Chorvoqqa olib boruvchi yagona savdo-koʻngilochar markazi. Hamma o'tadigan joyda strategik pozitsiyani egallang.",
            cta: "Bo'sh joylarni ko'rish"
        },
        location: {
            title: "Trafik markazi. Raqobatchilar yo'q.",
            subtitle: "Dumoloq Toshkentni asosiy dam olish maskanlari bilan bog‘laydigan muhim transport arteriyasida joylashgan. Biz yuqori xarid qobiliyatiga ega yuz minglab odamlar uchun majburiy to'xtash joyimiz.",
            map: {
                title: "Xaritadagi joylashuvimiz:",
                link: "Google Xaritalarda ochish"
            },
            traffic: {
                title: "Trafik:",
                value: "50 000 gacha",
                description: "eng yuqori kunlarda avtomobillar. Yil davomida mijozlarning kafolatlangan oqimi."
            },
            radius: {
                title: "30 daqiqa radiusda:",
                items: [
                    { label: "Asosiy kurortlar:", value: "Amirsoy, Chimyon, Beldersoy." },
                    { label: "Asosiy dam olish maskani:", value: "Chorvoq suv ombori." },
                    { label: "Aholi punktlari:", value: "Gʻazalkent, Yusufxona, Burchmulla." }
                ]
            }
        },
        opportunities: {
            title: "Biznesingiz uchun asosiy afzalliklar",
            items: [
                { icon: 'mapPin', title: 'Strategik joylashuv', description: 'Barcha turistik va dala hovli oqimlari biz orqali o\'tadi, bu esa tashrif buyuruvchilarning uzluksiz oqimini ta\'minlaydi.' },
                { icon: 'users', title: 'Kafolatlangan trafik', description: 'Korzinka va Sinsay kabi asosiy ijarachilar birinchi kundan boshlab barqaror yuqori xaridorlar oqimini yaratadi.' },
                { icon: 'shieldCheck', title: 'Raqobatchilarning yo\'qligi', description: 'Siz asosiy dam olish maskanlariga olib boradigan butun yo\'nalishdagi yagona zamonaviy SKMning bir qismiga aylanasiz.' },
                { icon: 'cog', title: 'Moslashuvchan shartlar', description: 'Biz har qanday murakkablikdagi loyihani amalga oshirish uchun erkin planirovkalar va individual yondashuvni taklif etamiz.' }
            ]
        },
        floorsOverview: {
            title: "Biznesingiz uchun 4 qavat imkoniyat",
            subtitle: "Dumoloqning har bir qavati o'ziga xos kontseptsiyaga ega bo'lib, maqsadli auditoriyani jalb qiladi va ijarachilar o'rtasida sinergiyani yaratadi.",
            floors: [
                {
                    floorNum: '1',
                    title: 'Oziq-ovqat va mahsulotlar',
                    description: '800 m² maydonga ega birinchi qavat to‘liq yakor ijarachilar — mamlakatdagi eng yirik Korzinka supermarketi va jahonga mashhur KFC restorani tomonidan egallangan. Birinchi kundan boshlab maksimal trafik va barqaror tashrif buyuruvchilar oqimi.',
                    logos: [
                        { url: "/logo/korzinka.png", name: "Korzinka" },
                        { url: "/logo/kfc.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Moda va uslub markazi',
                    description: '800 m² maydonga ega ikkinchi qavatni mashhur kiyim-kechak do‘koni Sinsay to‘liq egallaydi. Fashion-riteylga to‘liq eʼtibor, yoshlar va oilalar uchun zamonaviy yechimlar.',
                    logos: [
                        { url: "/logo/sinsay.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Fashion + Lifestyle',
                    description: '800 m² maydonga ega uchinchi qavat fashion-riteyl va lifestyle tovarlarini birlashtiradi. Bu yerda kiyim-kechak, poyabzal, aksessuarlar, shuningdek, uy-ro‘zg‘or buyumlari va zamonaviy turmush tarzi uchun yechimlar joylashadi.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Food-court + Ko‘ngilochar',
                    description: '400 m² maydonga ega to‘rtinchi qavat — tog‘larga panoramik manzarali gastronomiya va ko‘ngilochar zona. Bu yerda fud-kort, restoranlar, qahvaxonalar va ko‘ngilochar markazlar joylashadi. 457 m² maydonga ega noyob terrasa mintaqaning asosiy diqqatga sazovor joyiga aylanadi.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-4.jpg',
                    reverse: true
                }
            ]
        },
        atmosphere: {
            title: "Konseptsiya: Gateway to the Mountains",
            subtitle: "Ilhomlantiruvchi muhit",
            description: "Dumoloq interyeri tabiiy materiallar va tog' manzarali panoramik oynalarni o'zida mujassam etgan zamonaviy uslubda yaratilgan. Biz shunchaki savdo markazini emas, balki odamlar vaqt o'tkazishni istaydigan jozibador maskan yaratdik. Keng dam olish zonalari, Instagram uchun fotozonalar va o'ziga xos muhit tashrif buyuruvchilarni qayta-qayta qaytishga majbur qiladi."
        },
        floorPlans: {
            title: "Sizning ideal makoningiz",
            subtitle: "Biz tayyor kontseptsiyaga ega bo'sh joylarni taklif qilamiz. Biznesingiz uchun eng mos qavatni tanlang.",
            downloadButton: "Barcha qavat rejalarini yuklab olish (PDF)",
            tabs: {
                floor1: {
                    title: "1-qavat – Oziq-ovqat",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "800 m² maydon — Korzinka va KFC kabi yakor ijarachilar tomonidan to‘liq egallangan, bu barqaror tashrif buyuruvchilar oqimi va yuqori o‘tuvchanlikni taʼminlaydi.",
                    premisesTitle: "Ijarachilar",
                    premisesList: [
                        { label: "Korzinka:", value: "mamlakatdagi eng yirik supermarket" },
                        { label: "KFC:", value: "jahonga mashhur fast‑fud tarmog‘i" }
                    ],
                    imageAlt: "1-qavat rejasi"
                },
                floor2: {
                    title: "2-qavat – Fashion Retail",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "800 m² maydonni mashhur kiyim-kechak do‘koni Sinsay to‘liq egallaydi. Butun oila uchun fashion xaridlar markazi.",
                    premisesTitle: "Ijarachi",
                    premisesList: [
                        { label: "Sinsay:", value: "mashhur kiyim-kechak va aksessuarlar do‘koni" },
                        { label: "Maydon:", value: "800 m² zamonaviy savdo joyi" }
                    ],
                    imageAlt: "2-qavat rejasi"
                },
                floor3: {
                    title: "3-qavat – Fashion + Lifestyle",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "800 m² maydon — fashion-riteyl va lifestyle tovarlari uyg‘unligi. Kiyim-kechak, poyabzal, aksessuarlar, uy-ro‘zg‘or buyumlari va zamonaviy brendlar uchun ideal.",
                    premisesTitle: "Bo‘sh joylar",
                    premisesList: [
                        { label: "Umumiy maydon:", value: "800 m² erkin planirovka" },
                        { label: "Fashion zonasi:", value: "kiyim-kechak va aksessuarlar do‘konlari uchun" },
                        { label: "Lifestyle zonasi:", value: "uy-ro‘zg‘or va turmush tarzi tovarlari uchun" }
                    ],
                    imageAlt: "3-qavat rejasi"
                },
                floor4: {
                    title: "4-qavat – Food-court + Ko‘ngilochar",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "400 m² maydon — tog‘ manzarali gastronomiya va ko‘ngilochar zona. Fud-kort, restoranlar, qahvaxonalar va ko‘ngilochar markazlar uchun ideal.",
                    premisesTitle: "Bo‘sh joylar",
                    premisesList: [
                        { label: "Umumiy maydon:", value: "food‑court va ko‘ngilochar uchun 800 m²" },
                        { label: "Ochiq terrasa:", value: "457 m², tog‘ manzarasi bilan", highlight: true },
                        { label: "Zonalar:", value: "fud-kort, restoranlar, ko‘ngilochar" }
                    ],
                    imageAlt: "4-qavat rejasi"
                }
            }
        },
        techSpecs: {
            title: "Sizning qulayligingiz uchun hamma narsa o'ylangan.",
            specs: [
                { icon: "parking", title: "Avtoturargoh", description: "150+ avtomobil uchun keng yer usti avtoturargohi" },
                { icon: "ceiling", title: "Shift balandligi", description: "4.0 metr" },
                { icon: "utilities", title: "Kommunikatsiyalar", description: "Markazlashtirilgan tizimlar, yuqori elektr quvvati" },
                { icon: "transport", title: "Vertikal transport", description: "Yo'lovchi va yuk liftlari, eskalatorlar" },
                { icon: "security", title: "Xavfsizlik", description: "24/7 qo'riqlash va videokuzatuv" },
                { icon: "airconditioning", title: "Konditsioner", description: "Zamonaviy iqlim nazorati tizimi" }
            ]
        },
        rentalConditions: {
            title: "Moslashuvchan ijara shartlari",
            description: "Biz raqobatbardosh ijara stavkalarini va moslashuvchan hamkorlik shartlarini taklif etamiz. 20 m² dan 500 m² gacha bo'lgan erkin planirovkali maydonlar har qanday murakkablikdagi loyihani amalga oshirishga imkon beradi. Brendingiz uchun individual shartlarni muhokama qilish uchun biz bilan bog'laning.",
            cta: "Maslahat olish"
        },
        contact: {
            title: "Eng yaxshi joyni egallang. Raqobatchilar bo'lmaydi.",
            subtitle: "\"Dumoloq\" SKMda eng yaxshi joyni bron qilish va shaxsiy tijorat taklifini olish uchun ariza qoldiring.",
            form: {
                title: "Ariza formasi",
                name: "Ism",
                brand: "Brend",
                phone: "Telefon",
                email: "E-mail",
                submit: "Yuborish",
                submitAlert: "Ariza yuborildi! Tez orada siz bilan bog'lanamiz."
            },
            info: {
                title: "Bog'lanish uchun ma'lumot",
                managerLabel: "Menejer:",
                managerName: "Aleksey Petrov",
                phoneLabel: "Telefon:",
                phone: "+998 90 123 45 67",
                emailLabel: "E-mail:",
                email: "sales@dumoloq.uz"
            },
            qr: {
                title: "To'liq taqdimotni yuklab oling",
                subtitle: "Barcha ma'lumotlarga ega PDF-faylni olish uchun kamerani yo'naltiring.",
                alt: "Taqdimot uchun QR kod",
                data: "https://example.com/dumoloq-presentation-uz.pdf"
            }
        },
        faq: {
            title: "Tez-tez beriladigan savollar",
            subtitle: "Biz vaqtingizni qadrlaymiz. Bu yerda kelajakdagi hamkorlar uchun asosiy ma'lumotlar.",
            items: [
                {
                    question: "Ijaraning asosiy shartlari qanday?",
                    answer: "Biz uzoq muddatli ijara shartnomalarini (3 yildan) qat'iy stavka bilan taklif qilamiz. Ta'minot to'lovi nazarda tutilgan. Kommunal xizmatlar va ekspluatatsiya xarajatlari alohida to'lanadi."
                },
                {
                    question: "Ijarachilar uchun marketing yordami berilarmikan?",
                    answer: "Ha, biz keng qamrovli marketing yordamini taqdim etamiz: raqamli kanallarimizda joylashtirish, umumiy reklama kampaniyalarida ishtirok etish, birgalikda tadbirlar va aksiyalar tashkil qilish."
                },
                {
                    question: "Xonalar qanday holatda topshiriladi?",
                    answer: "Xonalar white box holatida kommunikatsiyalar (elektr, suv, ventilyatsiya, internet) ulangan holda topshiriladi. Pardozlash ishlari ijarachining zimmasida va savdo markazining dizayn kodiga muvofiq bajariladi."
                },
                {
                    question: "Ijarachi tanlash qanday amalga oshiriladi?",
                    answer: "Biz ijarachilarni ehtiyotkorlik bilan tanlaymiz, brend obro'si, moliyaviy barqarorlik va qavat kontseptsiyasiga mos kelishini hisobga olamiz. Taniqli brendlar va noyob kontseptsiyalarga ustunlik beriladi."
                },
                {
                    question: "Shartnoma tuzish uchun qanday hujjatlar kerak?",
                    answer: "Yuridik shaxslar uchun: ustav, soliq majburiyatlari haqida ma'lumotnoma, oxirgi yil uchun moliyaviy hisobot. Individual tadbirkorlar uchun: daromad haqida ma'lumotnoma, qarzdan xoli ekanligi haqida ma'lumotnoma. To'liq ro'yxat jiddiy qiziqish bo'lganida beriladi."
                }
            ]
        },
        footer: {
            copyright: "Dumoloq. Barcha huquqlar himoyalangan."
        }
    }
};