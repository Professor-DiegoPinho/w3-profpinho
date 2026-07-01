/**
 * Factories para testes de integração.
 *
 * Cada factory gera dados aleatórios (via Faker) para um cenário específico,
 * garantindo independência entre os testes. Opcionalmente aceita overrides
 * parciais para fixar campos relevantes em cada asserção.
 *
 * Uso:
 *   const cert = CertificateFactory.build({ studentName: 'João' });
 *   const user = UserFactory.buildId();
 */
import { faker } from '@faker-js/faker';
import { FEEDBACK_QUESTIONS } from '@/lib/feedbackConfig';
import { Timestamp } from 'firebase-admin/firestore';

// ---- Helpers internos ----

function buildUserId() {
  return `usr_${faker.string.uuid()}`;
}

function buildCourseSlug() {
  return faker.helpers.slugify(faker.word.words(2));
}

function buildLessonSlug() {
  return faker.helpers.slugify(faker.word.words(3));
}

// ---- Factories ----

export const UserFactory = {
  /** Gera um userId aleatório no formato `usr_<uuid>` */
  buildId: buildUserId,
};

export const CertificateFactory = {
  /** Gera dados de entrada para createCertificate */
  buildInput: (overrides = {}) => ({
    studentName: faker.person.fullName(),
    courseSlug: buildCourseSlug(),
    courseName: faker.lorem.words(3),
    workloadHours: faker.number.int({ min: 10, max: 120 }),
    submissionId: `sub_${faker.string.alphanumeric(8)}`,
    ...overrides,
  }),

  /** Gera dados como estariam armazenados no Firestore (após criação) */
  buildStored: (overrides = {}) => ({
    certificateId: `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${faker.string.alphanumeric(6).toUpperCase()}`,
    studentName: faker.person.fullName(),
    courseSlug: buildCourseSlug(),
    courseName: faker.lorem.words(3),
    workloadHours: faker.number.int({ min: 10, max: 120 }),
    validatedCount: 0,
    lastValidatedAt: null,
    generatedAt: Timestamp.fromDate(faker.date.past()),
    ...overrides,
  }),
};

export const EnrollmentFactory = {
  /** Gera dados de uma matrícula como armazenada no Firestore */
  buildStored: (overrides = {}) => ({
    userId: buildUserId(),
    courseId: buildCourseSlug(),
    enrolledAt: Timestamp.fromDate(faker.date.past()),
    ...overrides,
  }),
};

export const ProgressFactory = {
  /** Gera dados de progresso como armazenados no Firestore */
  buildStored: (overrides = {}) => ({
    completedLessons: [],
    totalLessons: faker.number.int({ min: 3, max: 20 }),
    completionPercentage: 0,
    completedAt: null,
    ...overrides,
  }),

  /** Gera dados de progresso com 100% de conclusão */
  buildCompleted: (overrides = {}) => {
    const lessons = Array.from(
      { length: overrides.totalLessons ?? 5 },
      (_, i) => `aula-${i + 1}`,
    );
    return {
      completedLessons: lessons,
      totalLessons: lessons.length,
      completionPercentage: 100,
      completedAt: faker.date.past().toISOString(),
      ...overrides,
    };
  },
};

export const FeedbackFactory = {
  /** Gera respostas válidas para todas as perguntas obrigatórias do feedbackConfig */
  buildValidAnswers: () => {
    const answers = {};
    FEEDBACK_QUESTIONS.forEach((q) => {
      const randomOption = faker.helpers.arrayElement(q.options);
      answers[q.id] = randomOption.value;
    });
    return answers;
  },

  /** Gera dados completos de feedback prontos para submissão */
  buildSubmitPayload: (overrides = {}) => ({
    npsScore: faker.number.int({ min: 0, max: 10 }),
    answers: FeedbackFactory.buildValidAnswers(),
    comment: faker.lorem.sentence(),
    ...overrides,
  }),

  /** Gera dados de estatísticas de feedback como armazenados no Firestore */
  buildStats: (overrides = {}) => ({
    courseSlug: buildCourseSlug(),
    totalResponses: faker.number.int({ min: 1, max: 200 }),
    avgNps: parseFloat(faker.number.float({ min: 0, max: 10, fractionDigits: 1 }).toFixed(1)),
    distributionNps: {},
    ...overrides,
  }),
};
