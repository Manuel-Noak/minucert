// fetchCourses.ts
interface FetchCoursesResponse {
  success: boolean;
  info: CourseSyntax[];
  pagination?: {
    total: number;
    perPage: number;
    offset: number;
    hasMore: boolean;
    totalPages: number;
    currentPage: number;
  };
  error?: string;
}

interface CourseSyntax {
  title: string;
  thumbnailLink: string;
  price: number;
  id: number;
  currencyCode: string;
}

export default async function fetchCourses(
  url: string
): Promise<FetchCoursesResponse> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        info: [],
        error: data.error || "Something went wrong",
      };
    }

    console.log(data.info);

    return {
      success: true,
      info: data.data || data.info || [], // Handle both new and old API response formats
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      success: false,
      info: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
