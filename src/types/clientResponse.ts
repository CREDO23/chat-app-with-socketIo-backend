interface ClientResponse {
  message: string;
  data: unknown;
  error: unknown;
  success: boolean;
  info: unknown;
}

export default ClientResponse;
