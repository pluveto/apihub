import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

async function execute(cmd: string): Promise<string> {
  const { stdout } = await exec(cmd);
  const chunks = [];
  const output: string = await new Promise((resolve, reject) => {
    stdout.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stdout.on('error', (err) => reject(err));
    stdout.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
  return output;
}

@Injectable()
export class EcsService {
  async getInfo() {
    let info = {
      status: 'Unknown',
      ip: 'unknown',
    };
    try {
      const output = await execute(
        '@chcp 65001 >nul & ' + `py "C:/script/ecs-controller/ecs.py" status`,
      );
      info = JSON.parse(output.trim().split('\n').pop());
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
    return info;
  }

  async start() {
    let info = {
      msg: 'error',
    };
    try {
      const output = await execute(
        '@chcp 65001 >nul & ' + `py "C:/script/ecs-controller/ecs.py" start`,
      );
      info = JSON.parse(output.trim().split('\n').pop());
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
    return info;
  }

  async stop() {
    let info = {
      msg: 'error',
    };
    try {
      const output = await execute(
        '@chcp 65001 >nul & ' + `py "C:/script/ecs-controller/ecs.py" stop`,
      );
      info = JSON.parse(output.trim().split('\n').pop());
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
    return info;
  }
}
