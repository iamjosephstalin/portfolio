import { describe, expect, it, vi } from 'vitest';

import { useToast } from '.';

describe('useToast', () => {
	it('should create a toast', () => {
		const { success, toasts } = useToast();
		success('Test message');
		expect(toasts.value.length).toBe(1);
		expect(toasts.value[0].message).toBe('Test message');
		expect(toasts.value[0].type).toBe('success');
	});

	it('should create different toast types', () => {
		const { success, error, info, toasts } = useToast();
		success('Success');
		error('Error');
		info('Info');
		expect(toasts.value.length).toBe(3);
		expect(toasts.value[0].type).toBe('success');
		expect(toasts.value[1].type).toBe('error');
		expect(toasts.value[2].type).toBe('info');
	});

	it('should auto remove toast after duration', () => {
		vi.useFakeTimers();
		const { success, toasts, removeToast } = useToast();
		success('Test', 1000);
		expect(toasts.value.length).toBe(1);
		vi.advanceTimersByTime(1000);
		expect(toasts.value.length).toBe(0);
		vi.useRealTimers();
	});

	it('should remove specific toast', () => {
		const { success, removeToast, toasts } = useToast();
		const id = success('Test');
		const id2 = success('Test 2');
		expect(toasts.value.length).toBe(2);
		removeToast(id);
		expect(toasts.value.length).toBe(1);
		expect(toasts.value[0].id).toBe(id2);
	});
});
