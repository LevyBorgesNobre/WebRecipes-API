import { PrismaClient } from "generated/prisma/client";
import { env } from "@/env/index"

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});