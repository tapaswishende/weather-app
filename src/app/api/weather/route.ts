import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const url = process.env.WEATHER_API_URL + '/current.json';

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  try {

    const searchParams = req.nextUrl.searchParams;
    const queryParams: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });


    const response = await axios.get(url, { params: {
        key: process.env.WETHER_API_KEY,
        ...queryParams
      } });

    console.log({ response: response.data });

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('Error in GET request:', error);
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || 'Internal Server Error';
      return new NextResponse(errorMessage, { status: statusCode });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}