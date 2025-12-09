
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";
import { UserUpdateSchema } from "@/models/user/dto/user";

const userService = new UserService();

//Obtiene un usuario por su ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const user = await userService.getUserById(id);
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Actualiza un usuario por su ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const userFounded = await userService.getUserById(id);
        if (!userFounded) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const body = await request.json();
        const dto = UserUpdateSchema.parse(body);
        const updatedUser = await userService.updateUser(id, dto);

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Elimina un usuario por su ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;

        const userFounded = await userService.getUserById(id);
        if (!userFounded) return NextResponse.json({ message: "User not found" }, { status: 404 });

        await userService.deleteUser(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
