import type { CreateUserProps, UserIdProps, UpdateUserProps } from '../types';
import { pool } from '../db';

export class UserModel {
  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM users ORDER BY id');
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser({ id }: UserIdProps) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [
        id,
      ]);
      if (rows.length === 0) return [];
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser({ data, res }: CreateUserProps) {
    try {
      const { id, name, email } = data;
      const { rows } = await pool.query(
        'INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *',
        [id, name, email]
      );
      return rows;
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ message: error.detail });
      }
    }
  }

  static async deleteUser({ id }: UserIdProps) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM users WHERE id=$1 RETURNING *',
        [id]
      );
      return rowCount;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser({ id, data, res }: UpdateUserProps) {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [
        id,
      ]);
      if (rows.length === 0) return [];
      const { userId = id, name, email } = rows[0];
      const updatedRecord = await pool.query(
        'UPDATE users SET id=$1, name=$2, email=$3 WHERE id=$4 RETURNING *',
        [data.id ?? userId, data.name ?? name, data.email ?? email, id]
      );
      return updatedRecord.rows;
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ message: error.detail });
      }
    }
  }
}
