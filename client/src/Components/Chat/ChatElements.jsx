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

const Message = ({data, writter, isOwner}) => {
    const ownerClass = !!isOwner ? 'message-owner' : '';
    return (
        <div className={`message ${ownerClass}`}>
            { !isOwner && !!writter && <h3>@{ writter }</h3> }
            <div className={`message-text ${ownerClass}`} >
                <p className={
                        `${ownerClass} ${!!isOwner?"background-owner":""}`
                    }
                    style={!writter ? borderOwner : {}}
                >
                    {data.message}
                </p>
            </div>
            <span className={ownerClass}>
                {data.time}
            </span>
        </div>
    );
}

const borderOwner = {
    borderRadius: "10px"
}

export {Contact, Message}