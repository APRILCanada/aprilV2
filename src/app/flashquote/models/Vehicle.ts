export class
    Vehicle {
    year: string;
    make: string;
    model: string;
    code: string;

    constructor(vehicle: {
        year?: string,
        make?: string,
        model?: string,
        code?: string,
    } = {}) {
        this.year = vehicle.year || '';
        this.make = vehicle.make || '';
        this.model = vehicle.model || '';
        this.code = vehicle.code || '';
    }

    get isEmpty() {
        return this.year == "" || this.make == "" || this.model == "";
    }
}
