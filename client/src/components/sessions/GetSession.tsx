export function GetSession(props: any) {
    const id = localStorage.getItem('user');

    if (id) {
        return (
            <div className='font-bold flex justify-center items-center text-center'>
                <p className='w-40 h-10 mt-3 '>Hello {id}!</p>
            </div>
        );
    }

    return null;
}
