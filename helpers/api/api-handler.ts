

export function apiHandler(handler:any) {
    return async (req:any, res:any) => {
        const method = req.method.toLowerCase();

        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}