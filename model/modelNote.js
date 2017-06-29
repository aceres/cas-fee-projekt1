class Note {

    constructor(title, description, finishDate, createdDate, importance, finished) {

        this.id = void 0;
        this.title = title;
        this.description = description;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.importance = importance;
        this.finished = finished;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            finishDate: this.finishDate,
            createdDate: this.createdDate,
            importance: this.importance
        };
    }
}

module.exports = Note;