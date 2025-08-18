export type Translation = {
    header: {
        title: string;
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
            title: "Dumoloq"
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
                    description: 'Первый этаж — точка притяжения для ежедневного трафика. Здесь расположены крупнейший в стране супермаркет Korzinka и всемирно известный ресторан KFC, обеспечивая постоянный поток посетителей с первого дня.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Korzinka.uz_logo.png/440px-Korzinka.uz_logo.png", name: "Korzinka" },
                        { url: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Эпицентр Моды и Стиля',
                    description: 'Второй этаж полностью отдан под fashion-ритейл. Якорным арендатором выступает Sinsay, а рядом с ним — десятки бутиков ведущих мировых и локальных брендов. Это место для шопинга и обновления гардероба.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sinsay_logo.svg/1280px-Sinsay_logo.svg.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Стиль Жизни и Покупки',
                    description: 'Третий этаж предлагает товары для всей семьи: от электроники и бытовой техники до товаров для дома, детских магазинов и специализированных бутиков. Идеальное пространство для создания уникального торгового предложения.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Гастрономия и Развлечения',
                    description: 'Четвертый этаж — это зона отдыха с панорамным видом на горы. Здесь разместятся фуд-корт, рестораны, кофейни и детские развлекательные центры. Уникальная терраса площадью 457 м² станет главной точкой притяжения всего региона.',
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
                    conceptText: "Этаж с максимальным трафиком. Большая часть площади занята якорными арендаторами Korzinka и KFC, но доступны помещения для сопутствующих товаров и услуг.",
                    premisesTitle: "Свободные помещения",
                    premisesList: [
                        { label: "Островные павильоны:", value: "от 8 м² (кофе, аксессуары, услуги)" },
                        { label: "Прикассовая зона:", value: "помещения от 25 м²" }
                    ],
                    imageAlt: "План 1 этажа"
                },
                floor2: {
                    title: "2 этаж – Fashion Retail",
                    conceptTitle: "Концепция",
                    conceptText: "Центр притяжения для любителей шопинга. Идеально для магазинов одежды, обуви, аксессуаров. Якорный арендатор — Sinsay.",
                    premisesTitle: "Свободные помещения",
                    premisesList: [
                        { label: "Бутики:", value: "от 50 м² до 150 м²" },
                        { label: "Флагманский магазин:", value: "350 м² с витринными окнами" }
                    ],
                    imageAlt: "План 2 этажа"
                },
                floor3: {
                    title: "3 этаж – Lifestyle",
                    conceptTitle: "Концепция",
                    conceptText: "Идеальное пространство для магазинов товаров для дома, электроники, детских товаров и специализированных бутиков.",
                    premisesTitle: "Ключевые помещения",
                    premisesList: [
                        { label: "Просторный зал под магазин:", value: "213 м²" },
                        { label: "Помещения под бутики:", value: "47 м², 73 м²" },
                        { label: "Свободная планировка:", value: "Возможность объединения помещений." }
                    ],
                    imageAlt: "План 3 этажа"
                },
                floor4: {
                    title: "4 этаж – Entertainment",
                    conceptTitle: "Концепция",
                    conceptText: "Зона гастрономии и развлечений с лучшим видом в регионе. Идеально для фуд-корта, ресторанов и детских игровых зон.",
                    premisesTitle: "Ключевые помещения",
                    premisesList: [
                        { label: "Панорамный обеденный зал:", value: "250 м²" },
                        { label: "Открытая терраса с видом на горы:", value: "457 м²!", highlight: true },
                        { label: "Площади под корнеры фуд-корта и кухню.", value: "" }
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
                { icon: "security", title: "Безопасность", description: "Круглосуточная охрана и видеонаблюдение" }
            ]
        },
        rentalConditions: {
            title: "Гибкие условия аренды",
            description: "Мы предлагаем конкурентные арендные ставки и гибкие условия сотрудничества. Площади от 20 м² до 500 м² со свободной планировкой позволяют реализовать проект любой сложности. Свяжитесь с нами, чтобы обсудить индивидуальные условия для вашего бренда.",
            cta: "Получить консультацию"
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
            title: "Dumoloq"
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
                    description: 'The first floor is a point of attraction for daily traffic. It houses the country\'s largest supermarket, Korzinka, and the world-famous KFC restaurant, ensuring a constant flow of visitors from day one.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Korzinka.uz_logo.png/440px-Korzinka.uz_logo.png", name: "Korzinka" },
                        { url: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Epicenter of Fashion & Style',
                    description: 'The second floor is entirely dedicated to fashion retail. The anchor tenant is Sinsay, surrounded by dozens of boutiques from leading global and local brands. This is the place for shopping and wardrobe updates.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sinsay_logo.svg/1280px-Sinsay_logo.svg.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Lifestyle & Shopping',
                    description: 'The third floor offers goods for the whole family: from electronics and home appliances to home goods, children\'s stores, and specialized boutiques. An ideal space to create a unique retail offering.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Gastronomy & Entertainment',
                    description: 'The fourth floor is a recreation area with panoramic mountain views. It will house a food court, restaurants, coffee shops, and children\'s entertainment centers. A unique 457 m² terrace will become the main attraction of the entire region.',
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
                    conceptText: "The floor with maximum traffic. Most of the area is occupied by anchor tenants Korzinka and KFC, but spaces are available for related goods and services.",
                    premisesTitle: "Available Spaces",
                    premisesList: [
                        { label: "Island pavilions:", value: "from 8 m² (coffee, accessories, services)" },
                        { label: "Checkout area:", value: "spaces from 25 m²" }
                    ],
                    imageAlt: "1st Floor Plan"
                },
                floor2: {
                    title: "2nd Floor – Fashion Retail",
                    conceptTitle: "Concept",
                    conceptText: "A center of attraction for shopping lovers. Ideal for clothing, footwear, and accessory stores. The anchor tenant is Sinsay.",
                    premisesTitle: "Available Spaces",
                    premisesList: [
                        { label: "Boutiques:", value: "from 50 m² to 150 m²" },
                        { label: "Flagship store:", value: "350 m² with display windows" }
                    ],
                    imageAlt: "2nd Floor Plan"
                },
                floor3: {
                    title: "3rd Floor – Lifestyle",
                    conceptTitle: "Concept",
                    conceptText: "An ideal space for home goods stores, electronics, children's goods, and specialized boutiques.",
                    premisesTitle: "Key Premises",
                    premisesList: [
                        { label: "Spacious hall for a store:", value: "213 m²" },
                        { label: "Boutique spaces:", value: "47 m², 73 m²" },
                        { label: "Open layout:", value: "Possibility to combine spaces." }
                    ],
                    imageAlt: "3rd Floor Plan"
                },
                floor4: {
                    title: "4th Floor – Entertainment",
                    conceptTitle: "Concept",
                    conceptText: "A gastronomy and entertainment zone with the best view in the region. Ideal for a food court, restaurants, and children's play areas.",
                    premisesTitle: "Key Premises",
                    premisesList: [
                        { label: "Panoramic dining hall:", value: "250 m²" },
                        { label: "Open terrace with mountain view:", value: "457 m²!", highlight: true },
                        { label: "Areas for food court corners and kitchen.", value: "" }
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
                { icon: "security", title: "Security", description: "24/7 security and video surveillance" }
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
        footer: {
            copyright: "Dumoloq. All rights reserved."
        }
    },
    uz: {
        header: {
            title: "Dumoloq"
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
                    title: 'Oziq-ovqat va Mahsulotlar',
                    description: 'Birinchi qavat — kundalik trafikni jalb qilish nuqtasi. Bu yerda mamlakatdagi eng yirik Korzinka supermarketi va dunyoga mashhur KFC restorani joylashgan bo‘lib, birinchi kundan boshlab doimiy tashrif buyuruvchilar oqimini ta’minlaydi.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Korzinka.uz_logo.png/440px-Korzinka.uz_logo.png", name: "Korzinka" },
                        { url: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png", name: "KFC" }
                    ],
                    imageUrl: '/images/floor-plans/floor-1.jpg'
                },
                {
                    floorNum: '2',
                    title: 'Moda va Uslub Markazi',
                    description: 'Ikkinchi qavat butunlay moda-riteylga ajratilgan. Asosiy ijarachi Sinsay bo‘lib, uning yonida o‘nlab yetakchi jahon va mahalliy brendlar butiklari joylashgan. Bu xarid qilish va garderobni yangilash uchun joy.',
                    logos: [
                        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sinsay_logo.svg/1280px-Sinsay_logo.svg.png", name: "Sinsay" }
                    ],
                    imageUrl: '/images/floor-plans/floor-2.jpg',
                    reverse: true
                },
                {
                    floorNum: '3',
                    title: 'Hayot Tarzi va Xaridlar',
                    description: 'Uchinchi qavat butun oila uchun mahsulotlarni taklif etadi: elektronika va maishiy texnikadan tortib, uy-ro‘zg‘or buyumlari, bolalar do‘konlari va ixtisoslashtirilgan butiklargacha. Noyob savdo taklifini yaratish uchun ideal makon.',
                    logos: [],
                    imageUrl: '/images/floor-plans/floor-3.jpg'
                },
                {
                    floorNum: '4',
                    title: 'Gastronomiya va Ko\'ngilochar',
                    description: 'To‘rtinchi qavat — tog‘larga panoramik manzarali dam olish maskani. Bu yerda fud-kort, restoranlar, qahvaxonalar va bolalar o‘yin-kulgi markazlari joylashadi. 457 m² maydonga ega noyob terrasa butun mintaqaning asosiy diqqatga sazovor joyiga aylanadi.',
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
                    conceptText: "Maksimal trafikka ega qavat. Maydonning katta qismini Korzinka va KFC ijarachilari egallagan, ammo tegishli tovarlar va xizmatlar uchun joylar mavjud.",
                    premisesTitle: "Bo'sh joylar",
                    premisesList: [
                        { label: "Orol pavilyonlari:", value: "8 m² dan (qahva, aksessuarlar, xizmatlar)" },
                        { label: "Kassa oldi zonasi:", value: "25 m² dan boshlanadigan joylar" }
                    ],
                    imageAlt: "1-qavat rejasi"
                },
                floor2: {
                    title: "2-qavat – Moda",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "Xarid qilishni sevuvchilar uchun joziba markazi. Kiyim-kechak, poyabzal, aksessuarlar do'konlari uchun ideal. Asosiy ijarachi — Sinsay.",
                    premisesTitle: "Bo'sh joylar",
                    premisesList: [
                        { label: "Butiklar:", value: "50 m² dan 150 m² gacha" },
                        { label: "Flagman do'kon:", value: "350 m² vitrina oynalari bilan" }
                    ],
                    imageAlt: "2-qavat rejasi"
                },
                floor3: {
                    title: "3-qavat – Hayot tarzi",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "Uy-ro'zg'or buyumlari, elektronika, bolalar tovarlari va ixtisoslashtirilgan butiklar uchun ideal makon.",
                    premisesTitle: "Asosiy joylar",
                    premisesList: [
                        { label: "Do'kon uchun keng zal:", value: "213 m²" },
                        { label: "Butiklar uchun joylar:", value: "47 m², 73 m²" },
                        { label: "Erkin planirovka:", value: "Joylarni birlashtirish imkoniyati." }
                    ],
                    imageAlt: "3-qavat rejasi"
                },
                floor4: {
                    title: "4-qavat – Ko'ngilochar",
                    conceptTitle: "Kontseptsiya",
                    conceptText: "Mintaqadagi eng yaxshi manzaraga ega gastronomiya va ko'ngilochar zona. Fud-kort, restoranlar va bolalar o'yin maydonchalari uchun ideal.",
                    premisesTitle: "Asosiy joylar",
                    premisesList: [
                        { label: "Panoramik ovqatlanish zali:", value: "250 m²" },
                        { label: "Tog' manzarali ochiq terrasa:", value: "457 m²!", highlight: true },
                        { label: "Fud-kort burchaklari va oshxona uchun maydonlar.", value: "" }
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
                { icon: "security", title: "Xavfsizlik", description: "24/7 qo'riqlash va videokuzatuv" }
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
        footer: {
            copyright: "Dumoloq. Barcha huquqlar himoyalangan."
        }
    }
};