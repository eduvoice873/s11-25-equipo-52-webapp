import { NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";

const userService = new UserService();

export async function GET() {
    const usersAdmins = await userService.getUserByAdminRol();
    return NextResponse.json(usersAdmins, { status: 200 });
}