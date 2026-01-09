import { PrismaClient } from "generated/prisma/client";
import { env } from "@/env/index"

export const db = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});