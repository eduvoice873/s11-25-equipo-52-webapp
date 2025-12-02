import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { message: "No file received" },
            { status: 400 }
        );
    }

    const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
            method: "POST",
            body: (() => {
                const fd = new FormData();
                fd.append("file", file, file.name);
                fd.append("upload_preset", "next-upload");
                return fd;
            })(),
        }
    );

    const data = await cloudinaryRes.json();
    return NextResponse.json(data);
}
