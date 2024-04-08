import { PersonRepository } from "../../../repositories/person-repository";
import { PersonSwapi } from "../utils/person-model";
export class SearchPersonSwapi {
  private personRepository: PersonRepository;
  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  async execute(id: number): Promise<PersonSwapi | null> {
    return this.personRepository.getPersonFromSwapi(id);
  }
}
