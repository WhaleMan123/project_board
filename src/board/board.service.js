const boardRepository = require("./board.repository");

exports.getFindAll = async () => {
    try {
        const result = await boardRepository.findAll();
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};

exports.getFindOne = async (id) => {
    try {
        await boardRepository.incrementHit(id);
        const result = await boardRepository.findOne(id);
        // console.log(result);
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};

exports.getFindOneWithoutIncreamentHit = async (id) => {
    try {
        const result = await boardRepository.findOne(id);
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};

exports.write = async (data) => {
    try {
        const result = await boardRepository.write(data);
        // console.log("Service Layer에서 반환된 ID 값:", result.id);
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};

exports.modify = async (id, data) => {
    try {
        const result = await boardRepository.modify(id, data);
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};

exports.delete = async (id) => {
    try {
        const result = await boardRepository.delete(id);
        return result;
    } catch (e) {
        throw new Error(`Service 오류 발생 ${e.message}`);
    }
};
