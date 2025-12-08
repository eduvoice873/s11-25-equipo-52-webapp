import { NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";

const userService = new UserService();

export async function GET() {
    const usersEditors = await userService.getUserByEditorRol();
    return NextResponse.json(usersEditors, { status: 200 });
}