export const IconEdit = ({ color = '#000000' }: { color?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} width="20px" height="20px" viewBox="-4 0 32 32" version="1.1">
            <title>edit</title>
            <path d="M17.438 22.469v-4.031l2.5-2.5v7.344c0 1.469-1.219 2.688-2.656 2.688h-14.625c-1.469 0-2.656-1.219-2.656-2.688v-14.594c0-1.469 1.188-2.688 2.656-2.688h14.844v0.031l-2.5 2.469h-11.5c-0.531 0-1 0.469-1 1.031v12.938c0 0.563 0.469 1 1 1h12.938c0.531 0 1-0.438 1-1zM19.813 7.219l2.656 2.656 1.219-1.219-2.656-2.656zM10.469 16.594l2.625 2.656 8.469-8.469-2.625-2.656zM8.594 21.094l3.625-0.969-2.656-2.656z" />
        </svg>
    )
}

export const IconDelete = ({ color = '#000000' }: { color?: string }) => {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path d="M10 11V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 11V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 7H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
    )
}