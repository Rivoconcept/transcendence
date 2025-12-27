transcendence/
│
├── Makefile
├── secrets/
│   ├── POSTGRES_PASSWORD.txt
│   └── certs/
│       ├── nginx.crt
│       └── nginx.key
│
└── srcs/
    ├── .env
    ├── docker-compose.yml
    │
    ├── requirements/
    │   ├── nginx/
    │   │   └── conf/
    │   │       └── default.conf
    │   │
    │   └── backend/
    │       ├── Dockerfile
    │       ├── package.json
    │       ├── tsconfig.json
    │       └── src/
    │           ├── index.ts
    │           ├── data-source.ts
    │           └── entity/
    │               └── User.ts
    │
    └── site/          (frontend plus tard)
