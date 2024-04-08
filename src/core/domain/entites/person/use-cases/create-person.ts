import { QueryResult } from "mysql2";
import { PersonRepository } from "../../../repositories/person-repository";
import { PersonSwapi } from "../utils/person-model";
export class CreatePerson {
  private personRepository: PersonRepository;
  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }
  async execute(person: PersonSwapi): Promise<QueryResult> {
    return this.personRepository.createPerson(person);
  }
}
