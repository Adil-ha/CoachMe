SELECT U.U_idUser, U.U_name, U.U_email, U.U_phone, U.U_role, A.A_idAddress, A.A_number, A.A_street, A.A_town, A.A_code, A.A_country
FROM T_User U
    LEFT JOIN T_Address A ON U.U_idUser = A.U_idUser
WHERE
    U.U_email = 'bob@example.com';