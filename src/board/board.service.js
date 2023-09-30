// const boardRepository = require("./board.repository");

const { FreeBoardRepository, AnnouncementBoardRepository } = require("./board.repository");

const freeboardRepo = new FreeBoardRepository();
const announcementboardRepo = new AnnouncementBoardRepository();

class FreeBoardService {
    constructor() {
        this.repository = new FreeBoardRepository();
    }

    async getFindAll() {
        try {
            const result = await this.repository.findAll();
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async getFindOne(id) {
        try {
            await this.repository.incrementHit(id);
            const result = await this.repository.findOne(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async getFindOneWithoutIncreamentHit(id) {
        try {
            const result = await this.repository.findOne(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async write(data) {
        try {
            const result = await this.repository.write(data);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async modify(id, data) {
        try {
            const result = await this.repository.modify(id, data);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async delete(id) {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }
}

class AnnouncementBoardService {
    constructor() {
        this.repository = new AnnouncementBoardRepository();
    }

    async getFindAll() {
        try {
            const result = await this.repository.findAll();
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async getFindOne(id) {
        try {
            await this.repository.incrementHit(id);
            const result = await this.repository.findOne(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async getFindOneWithoutIncreamentHit(id) {
        try {
            const result = await this.repository.findOne(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async write(data) {
        try {
            const result = await this.repository.write(data);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async modify(id, data) {
        try {
            const result = await this.repository.modify(id, data);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }

    async delete(id) {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (e) {
            throw new Error(`Service 오류 발생 ${e.message}`);
        }
    }
}

module.exports = {
    FreeBoardService,
    AnnouncementBoardService,
};

// ---------------- 클래스화 이전의 코드들

// exports.getFindAll = async () => {
//     try {
//         const result = await boardRepository.findAll();
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };

// exports.getFindOne = async (id) => {
//     try {
//         await boardRepository.incrementHit(id);
//         const result = await boardRepository.findOne(id);
//         // console.log(result);
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };

// exports.getFindOneWithoutIncreamentHit = async (id) => {
//     try {
//         const result = await boardRepository.findOne(id);
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };

// exports.write = async (data) => {
//     try {
//         const result = await boardRepository.write(data);
//         // console.log("Service Layer에서 반환된 ID 값:", result.id);
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };

// exports.modify = async (id, data) => {
//     try {
//         const result = await boardRepository.modify(id, data);
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };

// exports.delete = async (id) => {
//     try {
//         const result = await boardRepository.delete(id);
//         return result;
//     } catch (e) {
//         throw new Error(`Service 오류 발생 ${e.message}`);
//     }
// };
