const CommentaryForm = () => {
    return (
        <div className="w-2/3 h-fit p-4 shadow-2xl rounded-3xl">
            <textarea className="w-full h-fit max-h-30 p-4 border-b-1"/>
            <section className="flex flex-row justify-end gap-4">
                <button className="p-2 rounded-3xl border-1">Cancel</button>
                <button className="p-2 rounded-3xl border-1">Send commentary</button>
            </section>
        </div>
    );
}

export default CommentaryForm;