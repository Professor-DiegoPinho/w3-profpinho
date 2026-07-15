
import { describe, expect, it } from 'vitest';
import {
  getCourse,
  getCourseAccessType,
  getCourseVisibility,
  isPublicCourse,
  courseRequiresEnrollment,
  isPaidCourse,
  canUserAccessCourseLessons,
  isCourseVisibleToUser,
  getCourseAccessLabel,
} from '@/lib/courseAccess.js';


describe('getCourse', () => {
  it('deve retornar o curso pelo slug exato', () => {
    const course = getCourse('logica-de-programacao-python');
    expect(course).not.toBeNull();
    expect(course.slug).toBe('logica-de-programacao-python');
  });

  it('deve retornar o objeto de curso se passado como argumento (passthrough)', () => {
    const courseObj = { slug: 'meu-curso', accessType: 'tutorial' };
    const result = getCourse(courseObj);
    expect(result).toBe(courseObj);
  });

  it('deve retornar null para slug inexistente', () => {
    const result = getCourse('curso-que-nao-existe-xyz');
    expect(result).toBeNull();
  });

  it('deve retornar null para null/undefined/string vazia', () => {
    expect(getCourse(null)).toBeNull();
    expect(getCourse(undefined)).toBeNull();
    expect(getCourse('')).toBeNull();
  });

  it('deve resolver slug com sufixo _resume para accessType resume', () => {
    const course = getCourse('javascript_resume');
    expect(course).not.toBeNull();
    expect(course.accessType).toBe('resume');
  });
});


describe('getCourseAccessType', () => {
  it('deve retornar "free-course" para um curso gratuito', () => {
    expect(getCourseAccessType('logica-de-programacao-python')).toBe('free-course');
  });

  it('deve retornar "tutorial" para um tutorial', () => {
    expect(getCourseAccessType('html')).toBe('tutorial');
  });

  it('deve retornar "free-course" como padrão para slug desconhecido', () => {
    expect(getCourseAccessType('slug-inexistente')).toBe('free-course');
  });

  it('deve aceitar objeto de curso diretamente', () => {
    const courseObj = { slug: 'test', accessType: 'paid-course' };
    expect(getCourseAccessType(courseObj)).toBe('paid-course');
  });
});


describe('getCourseVisibility', () => {
  it('deve retornar "public" para curso público', () => {
    expect(getCourseVisibility('logica-de-programacao-python')).toBe('public');
  });

  it('deve retornar "public" como padrão para curso sem visibility definido', () => {
    expect(getCourseVisibility('css')).toBe('public');
  });

  it('deve retornar "public" para slug desconhecido', () => {
    expect(getCourseVisibility('inexistente')).toBe('public');
  });
});


describe('isPublicCourse', () => {
  it('deve retornar true para curso público', () => {
    expect(isPublicCourse('logica-de-programacao-python')).toBe(true);
  });

  it('deve retornar true para curso sem visibility explícito (padrão public)', () => {
    expect(isPublicCourse('css')).toBe(true);
  });

  it('deve retornar false para curso privado', () => {
    const privateCourse = { slug: 'test', visibility: 'private' };
    expect(isPublicCourse(privateCourse)).toBe(false);
  });
});


describe('courseRequiresEnrollment', () => {
  it('deve retornar true para curso gratuito (free-course)', () => {
    expect(courseRequiresEnrollment('logica-de-programacao-python')).toBe(true);
  });

  it('deve retornar false para tutorial', () => {
    expect(courseRequiresEnrollment('html')).toBe(false);
  });

  it('deve retornar false para resume', () => {
    expect(courseRequiresEnrollment('javascript_resume')).toBe(false);
  });

  it('deve retornar true para curso pago', () => {
    const paidCourse = { slug: 'test', accessType: 'paid-course' };
    expect(courseRequiresEnrollment(paidCourse)).toBe(true);
  });
});


describe('isPaidCourse', () => {
  it('deve retornar false para curso gratuito', () => {
    expect(isPaidCourse('logica-de-programacao-python')).toBe(false);
  });

  it('deve retornar false para tutorial', () => {
    expect(isPaidCourse('html')).toBe(false);
  });

  it('deve retornar true para objeto de curso pago', () => {
    const paidCourse = { slug: 'test', accessType: 'paid-course' };
    expect(isPaidCourse(paidCourse)).toBe(true);
  });
});


describe('canUserAccessCourseLessons', () => {
  it('deve retornar true para tutorial sem matrícula', () => {
    expect(canUserAccessCourseLessons('html', [])).toBe(true);
  });

  it('deve retornar true para resume sem matrícula', () => {
    expect(canUserAccessCourseLessons('javascript_resume', [])).toBe(true);
  });

  it('deve retornar false para curso gratuito sem matrícula', () => {
    expect(canUserAccessCourseLessons('logica-de-programacao-python', [])).toBe(false);
  });

  it('deve retornar true para curso gratuito quando matriculado', () => {
    expect(
      canUserAccessCourseLessons('logica-de-programacao-python', ['logica-de-programacao-python'])
    ).toBe(true);
  });

  it('deve aceitar objeto de curso', () => {
    const course = { slug: 'free-test', accessType: 'free-course' };
    expect(canUserAccessCourseLessons(course, ['free-test'])).toBe(true);
  });
});


describe('isCourseVisibleToUser', () => {
  it('deve retornar true para curso público mesmo sem matrícula', () => {
    expect(isCourseVisibleToUser('logica-de-programacao-python', [])).toBe(true);
  });

  it('deve retornar true para slug desconhecido (fallback)', () => {
    expect(isCourseVisibleToUser('inexistente', [])).toBe(true);
  });

  it('deve retornar false para curso privado sem matrícula', () => {
    const privateCourse = { slug: 'secret', visibility: 'private' };
    expect(isCourseVisibleToUser(privateCourse, [])).toBe(false);
  });

  it('deve retornar true para curso privado quando matriculado', () => {
    const privateCourse = { slug: 'secret', visibility: 'private' };
    expect(isCourseVisibleToUser(privateCourse, ['secret'])).toBe(true);
  });
});


describe('getCourseAccessLabel', () => {
  it('deve retornar "Curso gratuito" para free-course', () => {
    expect(getCourseAccessLabel('logica-de-programacao-python')).toBe('Curso gratuito');
  });

  it('deve retornar "Tutorial aberto" para tutorial', () => {
    expect(getCourseAccessLabel('html')).toBe('Tutorial aberto');
  });

  it('deve retornar "Resumo aberto" para resume', () => {
    expect(getCourseAccessLabel('javascript_resume')).toBe('Resumo aberto');
  });

  it('deve retornar "Curso pago" para paid-course', () => {
    const paidCourse = { slug: 'test', accessType: 'paid-course' };
    expect(getCourseAccessLabel(paidCourse)).toBe('Curso pago');
  });

  it('deve retornar "Curso gratuito" como padrão para slug desconhecido', () => {
    expect(getCourseAccessLabel('inexistente')).toBe('Curso gratuito');
  });
});
