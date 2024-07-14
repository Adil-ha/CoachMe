INSERT INTO
    T_User (
        U_name,
        U_email,
        U_password,
        U_phone,
        U_role
    )
VALUES (
        'Admin',
        'admin@example.com',
        '$2a$10$9qvXwQ2T4vE0BiUw0v.mqusmjd.yKKhHkE9tov7U.3/4eIDZMVQXK',
        '1234567890',
        'ROLE_ADMIN'
    ),
    (
        'Bob Smith',
        'bob@example.com',
        '$2a$10$7sH1l7lEmLyIqlWtD24O4Owl7D3lLqnh3aCrT6ZbmVJNmjlvawfBe',
        '0987654321',
        'ROLE_USER'
    );

INSERT INTO
    T_Book (
        B_title,
        B_author,
        B_price,
        B_description,
        B_image
    )
VALUES (
        'The Encyclopedia of Modern Bodybuilding',
        'Arnold Schwarzenegger',
        29.99,
        'A comprehensive guide to bodybuilding techniques.',
        'book1.jpg'
    ),
    (
        'Born to Run: A Hidden Tribe, Superathletes, and the Greatest Race the World Has Never Seen',
        'Christopher McDougall',
        14.99,
        'A book about the hidden tribe of the world\'s greatest ultra-runners.',
        'book2.jpg'
    ),
    (
        'The Inner Game of Tennis: The Classic Guide to the Mental Side of Peak Performance',
        'W. Timothy Gallwey',
        12.50,
        'A guide to mastering the mental aspects of tennis and other sports.',
        'book3.jpg'
    ),
    (
        'Endure: Mind, Body, and the Curiously Elastic Limits of Human Performance',
        'Alex Hutchinson',
        18.75,
        'An exploration of the science of endurance and human limits.',
        'book4.jpg'
    );

INSERT INTO
    T_Performance (
        P_type,
        P_description,
        P_image
    )
VALUES (
        'La perte de poids',
        'Séances d\'entraînement personnalisées en tête-à-tête pour atteindre vos objectifs de perte de poids. Nous utilisons une approche combinée de cardio, de musculation et de conseils nutritionnels pour vous aider à perdre du poids de manière saine et durable.',
        'service1.jpg'
    ),
    (
        'Le Pilates',
        'Cours de Pilates énergiques en groupe, adaptés à tous les niveaux de condition physique. Ces séances vous aideront à améliorer votre posture, votre flexibilité et votre force, tout en réduisant le stress et les tensions corporelles.',
        'service2.jpg'
    ),
    (
        'La remise en forme',
        'Plans de nutrition personnalisés et séances de conseil pour retrouver la forme. Nous offrons des programmes sur mesure pour vous aider à adopter un mode de vie plus sain, améliorer votre endurance et atteindre vos objectifs de fitness.',
        'service3.jpg'
    ),
    (
        'Le renforcement musculaire',
        'Programmes de musculation pour développer et tonifier vos muscles. Nos entraîneurs expérimentés vous guideront à travers des exercices ciblés pour augmenter votre force, votre endurance et votre masse musculaire.',
        'service4.jpg'
    ),
    (
        'La gym douce',
        'Séances de gym douce pour améliorer votre souplesse et votre bien-être général. Idéal pour les personnes cherchant à se détendre tout en faisant de l\'exercice, ces cours combinent des mouvements doux avec des techniques de relaxation.',
        'service5.jpg'
    ),
    (
        'La boxe',
        'Entraînements de boxe pour améliorer votre condition physique et votre endurance. Nos sessions de boxe combinent des exercices cardiovasculaires intenses avec des techniques de boxe pour brûler des calories, renforcer votre corps et améliorer votre agilité.',
        'service6.jpg'
    );

INSERT INTO
    T_Address (
        A_number,
        A_street,
        A_town,
        A_code,
        A_country,
        U_idUser
    )
VALUES (
        '123',
        'Main Street',
        'Springfield',
        '12345',
        'USA',
        2
    );