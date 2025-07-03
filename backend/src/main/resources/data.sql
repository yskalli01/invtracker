INSERT INTO "users" (id, name, role, email, password, image_path, phone, address, country)
VALUES (1, 'John Doe', 'ADMIN', 'admin@hotmail.com', '$2a$10$jTtbWeLSVFPUQUDV.vAid.YBfW7vWeN51CpMCdDMv/rw.PC/klnAq', 
null, '+212600000000', '123 Main St', 'Morocco') ON CONFLICT (id) DO NOTHING;
