import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type {
  EventService,
  ServiceQueryParams,
  CreateServiceInput,
  UpdateServiceInput,
} from "../types/service";

export const getServices = async (
  params?: ServiceQueryParams
): Promise<EventService[]> => {
  const cleanParams: Record<string, string | number> = {};
  if (params?.keyword) cleanParams.keyword = params.keyword;
  if (params?.category) cleanParams.category = params.category;
  if (params?.minPrice !== undefined && params.minPrice > 0) cleanParams.minPrice = params.minPrice;
  if (params?.maxPrice !== undefined && params.maxPrice > 0) cleanParams.maxPrice = params.maxPrice;

  const response = await AxiosInstance.get<EventService[]>(
    API_ROUTES.SERVICES.BASE,
    { params: cleanParams }
  );
  return response.data;
};

export const createService = async (
  data: CreateServiceInput,
  imageFile?: File
): Promise<EventService> => {
  if (imageFile) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("pricePerDay", data.pricePerDay.toString());
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("contactDetails", data.contactDetails);
    
    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl);
    }
    
    formData.append("availabilityDates", JSON.stringify(data.availabilityDates));
    formData.append("image", imageFile);

    const response = await AxiosInstance.post<EventService>(
      API_ROUTES.SERVICES.BASE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } else {
    const response = await AxiosInstance.post<EventService>(
      API_ROUTES.SERVICES.BASE,
      data
    );
    return response.data;
  }
};

export const updateService = async (
  id: string,
  data: UpdateServiceInput,
  imageFile?: File
): Promise<EventService> => {
  if (imageFile) {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.category) formData.append("category", data.category);
    if (data.pricePerDay !== undefined) formData.append("pricePerDay", data.pricePerDay.toString());
    if (data.description) formData.append("description", data.description);
    if (data.location) formData.append("location", data.location);
    if (data.contactDetails) formData.append("contactDetails", data.contactDetails);
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    if (data.availabilityDates) {
      formData.append("availabilityDates", JSON.stringify(data.availabilityDates));
    }
    formData.append("image", imageFile);

    const response = await AxiosInstance.patch<EventService>(
      API_ROUTES.SERVICES.BY_ID(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } else {
    const response = await AxiosInstance.patch<EventService>(
      API_ROUTES.SERVICES.BY_ID(id),
      data
    );
    return response.data;
  }
};

export const deleteService = async (id: string): Promise<{ message: string }> => {
  const response = await AxiosInstance.delete<{ message: string }>(
    API_ROUTES.SERVICES.BY_ID(id)
  );
  return response.data;
};
