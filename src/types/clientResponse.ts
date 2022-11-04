
interface ClientResponse {
    message: string
    data: unknown
    error: unknown
    success : boolean
}

export default ClientResponse