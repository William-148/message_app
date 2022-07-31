const Contact = ({nickname, state, profile}) => {
    return(
        <div className="member">
            <img src={!!profile ? profile : "https://picsum.photos/100"} alt="image" />
            <section>
                <h3>{nickname}</h3>
                <p>{state}</p>
            </section>
        </div>
    );
}

const Message = ({data, isOwner}) => {
    const ownerClass = !!isOwner ? 'message-owner' : '';
    return (
        <div className={`message ${ownerClass}`}>
            { !isOwner && <h3>{data.writter}</h3> }
            <div className={`message-text ${ownerClass}`}>
                <p className={`${ownerClass} ${!!isOwner?"background-owner":""}`}>
                    {data.message}
                </p>
            </div>
            <span className={ownerClass}>
                {data.time}
            </span>
        </div>
    );
}

export {Contact, Message}