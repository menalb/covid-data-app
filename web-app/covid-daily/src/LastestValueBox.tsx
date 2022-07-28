export const LastestValueBox: React.FC<{ last: { date: string, current: any, prev?: any } }> = ({ last }) =>
    <span className="flex flex-col sm:flex-row">
        <span className="p-1">{last?.date}</span>
        <span className="p-1"> corrente: <b className="p-2">{last?.current}</b></span>
        {last.prev &&
            <span className="p-1">anno precedente: <b className="p-2">{last?.prev}</b></span>
        }
    </span>
