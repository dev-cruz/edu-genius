#!/usr/bin/make
export

quero-boot-startup:
		npm i
		npm run start:dev

setup-db:
		npm i
		npx prisma db push
		npx prisma generate
		npx prisma db seed