import { NextRequest, NextResponse } from "next/server";
import api from "@/server/api";
import axios from "axios";  // Import the custom Axios instance

const url = process.env.WEATHER_API_URL + '/search.json';  // This is now a relative path

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  try {
    console.log('url => ', url);
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const queryParams: Record<string, string> = {};

    // Convert searchParams to a plain object
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });


    // Make the API request using the custom Axios instance
    const response = await api.get(url, { params: {
      key: process.env.WETHER_API_KEY,
      ...queryParams
    } });

    console.log({ response: response.data });

    // Return the data from the API response
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