import { PersonRepository } from "../../../repositories/person-repository";
import { PersonSwapi } from "../utils/person-model";
export class SearchPersons {
  private personRepository: PersonRepository;
  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  async execute(): Promise<PersonSwapi[] | null> {
    return this.personRepository.getPersons();
  }
}
