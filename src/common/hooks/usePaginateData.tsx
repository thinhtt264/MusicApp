import { useEffect, useState } from "react";


export const usePaginateData = ({ orgData, limit = 10 }: {
    orgData: any[],
    limit?: number
}) => {
    if (orgData.length > 15) return { handleLoadMore: () => { }, data: orgData, totalPages: 0 };

    const [data, setData] = useState<any>([])
    const [offset, setOffset] = useState(0)

    const totalPages = Math.ceil(orgData.length / limit) * limit;

    useEffect(() => {
        const startIndex = offset;
        const endIndex = Math.min(startIndex + limit, orgData.length);

        const paginatedData = orgData.slice(startIndex, endIndex);

        setData((prev: any) => {
            return [...prev, ...paginatedData]
        })
    }, [offset])

    const handleLoadMore = () => {
        setOffset((prev) => prev + limit)
    }



    return { handleLoadMore, data, totalPages };
}