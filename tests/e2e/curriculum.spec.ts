import { test, expect } from '@playwright/test';
import { CURRICULUM } from '../../lib/curriculum';

test.describe('Curriculum Walkthrough', () => {
  // Increase timeout for this long test
  test.setTimeout(120000);

  test('Completes all units and lessons', async ({ page }) => {
    await page.goto('/');

    for (let u = 0; u < CURRICULUM.length; u++) {
      const unit = CURRICULUM[u];

      for (let l = 0; l < unit.lessons.length; l++) {
        const lesson = unit.lessons[l];
        console.log(`Testing Unit: ${unit.id}, Lesson: ${lesson.id}`);

        // Click on the unit node.
        await page.locator(`button[aria-label="${unit.title}"]`).click();

        for (let e = 0; e < lesson.exercises.length; e++) {
          const exercise = lesson.exercises[e];
          
          if (exercise.type === 'read') {
            await page.getByRole('button', { name: /continue/i }).click();
          } 
          else if (exercise.type === 'choose' || exercise.type === 'listen') {
            // Click any option
            await page.locator('button.border-2').first().click();
            await page.getByRole('button', { name: /check/i }).click();
            await page.getByRole('button', { name: /continue/i }).click();
          }
          else if (exercise.type === 'word-bank') {
            // Click any word tile
            await page.locator('.mt-6.flex.flex-wrap.gap-2 > button:not([disabled])').first().click();
            await page.getByRole('button', { name: /check/i }).click();
            await page.getByRole('button', { name: /continue/i }).click();
          }
          else if (exercise.type === 'spelling') {
            // Type into the input box
            await page.getByRole('textbox').fill('test');
            await page.getByRole('button', { name: /check/i }).click();
            await page.getByRole('button', { name: /continue/i }).click();
          }

          // Wait for short animation
          await page.waitForTimeout(300);
        }

        // At the end of the lesson, there's a Celebration screen.
        await page.getByRole('button', { name: /back to camp map/i }).click();
        
        // Wait for the map to re-appear
        await expect(page.locator(`text=${unit.title}`)).toBeVisible();
      }
    }
  });
});
