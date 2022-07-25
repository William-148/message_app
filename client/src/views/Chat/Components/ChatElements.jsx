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

const Message = ({data}) => {
    const owner = !!data.isOwner ? 'message-owner' : '';
    return (
        <div className={`message ${owner}`}>
            { !data.isOwner && <h3>{data.user}</h3> }
            <div className={`message-text ${owner}`}>
                <p className={`${owner} ${!!data.isOwner?"background-owner":""}`}>
                    {data.msg}
                </p>
            </div>
            <span className={owner}>
                {data.time}
            </span>
        </div>
    );
}

export {Contact, Message}