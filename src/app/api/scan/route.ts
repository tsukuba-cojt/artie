import { NextResponse } from "next/server";

const GOOGLE_CLOUD_ACCESS_TOKEN = process.env.GOOGLE_CLOUD_ACCESS_TOKEN;
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
const ENDPOINT_ID = process.env.GOOGLE_CLOUD_MODEL_ID;

const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}:predict`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "画像データが提供されていません。" },
        { status: 400 }
      );
    }

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GOOGLE_CLOUD_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          {
            content: imageBase64,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "予測リクエストが失敗しました。" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const predictions = data.predictions?.[0];

    if (!predictions || !predictions.confidences || !predictions.ids) {
      return NextResponse.json(
        { error: "作品を認識できませんでした。再度近づいて撮影してください。" },
        { status: 200 }
      );
    }

    const maxConfidenceIndex = predictions.confidences.indexOf(
      Math.max(...predictions.confidences)
    );

    const maxConfidence = predictions.confidences[maxConfidenceIndex];
    const maxId = predictions.ids[maxConfidenceIndex];
    console.log(predictions);

    if (maxConfidence < 0.8) {
      return NextResponse.json(
        { error: "作品を認識できませんでした。再度近づいて撮影してください。" },
        { status: 200 }
      );
    }

    return NextResponse.json({ id: maxId }, { status: 200 });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      {
        error: "予期せぬエラーが発生しました。再度時間をおいて試してください。",
      },
      { status: 500 }
    );
  }
}
